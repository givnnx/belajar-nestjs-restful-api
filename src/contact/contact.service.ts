import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';
import { Contact, Prisma, User } from 'generated/prisma';
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from '../model/contact.model';
import { ValidationService } from '..//common/validation.service';
import { ContactValidation } from './contact.validation';
import { WebResponse } from 'src/model/web.model';

@Injectable()
export class ContactService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(
      `ContactService.create(${JSON.stringify(user)},${JSON.stringify(request)})`,
    );

    const createRequest: CreateContactRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: { ...createRequest, username: user.username },
    });

    return this.toContactResponst(contact);
  }

  toContactResponst(contact: Contact): ContactResponse {
    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    };
  }

  async get(user: User, contactId: number): Promise<ContactResponse> {
    this.logger.debug(`ContactService.get(${JSON.stringify(user)})`);

    const contact = await this.checkContactMustExists(user.username, contactId);

    return this.toContactResponst(contact);
  }

  async checkContactMustExists(
    username: string,
    contactId: number,
  ): Promise<Contact> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return contact;
  }

  async update(
    user: User,
    request: UpdateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(
      `ContactService.update(${JSON.stringify(user)},${JSON.stringify(request)})`,
    );

    const updateRequest: UpdateContactRequest = this.validationService.validate(
      ContactValidation.UPDATE,
      request,
    );

    let contact = await this.checkContactMustExists(
      user.username,
      updateRequest.id,
    );

    contact = await this.prismaService.contact.update({
      where: { id: updateRequest.id },
      data: updateRequest,
    });

    return this.toContactResponst(contact);
  }

  async remove(user: User, contactId: number): Promise<ContactResponse> {
    this.logger.debug(`ContactService.remove(${JSON.stringify(user)})`);

    await this.checkContactMustExists(user.username, contactId);

    const result = await this.prismaService.contact.delete({
      where: { id: contactId },
    });

    return this.toContactResponst(result);
  }

  async search(
    user: User,
    request: SearchContactRequest,
  ): Promise<WebResponse<ContactResponse[]>> {
    const searchRequest: SearchContactRequest = this.validationService.validate(
      ContactValidation.SEARCH,
      request,
    );

    const filters: Prisma.ContactWhereInput[] = [];

    if (searchRequest.name) {
      filters.push({
        OR: [
          {
            first_name: { contains: searchRequest.name },
            last_name: { contains: searchRequest.name },
          },
        ],
      });
    }

    if (searchRequest.email) {
      filters.push({
        email: { contains: searchRequest.email },
      });
    }

    if (searchRequest.phone) {
      filters.push({
        phone: { contains: searchRequest.phone },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const contacts = await this.prismaService.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.contact.count({
      where: { username: user.username, AND: filters },
    });

    return {
      data: contacts.map((contact) => this.toContactResponst(contact)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
