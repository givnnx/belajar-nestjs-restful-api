import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Address, User } from 'generated/prisma';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  RemoveAddressRequest,
  UpdateAddressRequest,
} from '../model/address.model';
import { Logger } from 'winston';
import { addressValidation } from './address.validation';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class AddressService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private contacService: ContactService,
  ) {}

  async create(
    user: User,
    request: CreateAddressRequest,
  ): Promise<AddressResponse> {
    this.logger.debug(
      `AddressService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateAddressRequest = this.validationService.validate(
      addressValidation.CREATE,
      request,
    );

    await this.contacService.checkContactMustExists(
      user.username,
      createRequest.contact_id,
    );

    const address = await this.prismaService.address.create({
      data: createRequest,
    });

    return this.toAddressResponse(address);
  }

  toAddressResponse(address: AddressResponse): AddressResponse {
    return {
      id: address.id,
      city: address.city,
      country: address.country,
      street: address.street,
      province: address.province,
      postal_code: address.postal_code,
    };
  }

  async checkAddressMustExists(
    contactId: number,
    addressId: number,
  ): Promise<Address | null> {
    const address = await this.prismaService.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new HttpException('Address is not found', 404);
    }

    return address;
  }

  async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequset: GetAddressRequest = this.validationService.validate(
      addressValidation.GET,
      request,
    );

    await this.contacService.checkContactMustExists(
      user.username,
      getRequset.contact_id,
    );

    const address = await this.checkAddressMustExists(
      getRequset.contact_id,
      getRequset.address_id,
    );

    return this.toAddressResponse(address!);
  }

  async update(
    user: User,
    request: UpdateAddressRequest,
  ): Promise<AddressResponse> {
    const updateRequest: UpdateAddressRequest = this.validationService.validate(
      addressValidation.UPDATE,
      request,
    );

    await this.contacService.checkContactMustExists(
      user.username,
      updateRequest.contact_id,
    );

    let address = await this.checkAddressMustExists(
      updateRequest.contact_id,
      updateRequest.id,
    );

    address = await this.prismaService.address.update({
      where: { id: updateRequest.id },
      data: updateRequest,
    });

    return this.toAddressResponse(address);
  }

  async remove(
    user: User,
    request: RemoveAddressRequest,
  ): Promise<AddressResponse> {
    const removeRequest: RemoveAddressRequest = this.validationService.validate(
      addressValidation.REMOVE,
      request,
    );

    await this.contacService.checkContactMustExists(
      user.username,
      removeRequest.contact_id,
    );

    await this.checkAddressMustExists(
      removeRequest.contact_id,
      removeRequest.address_id,
    );

    const address = await this.prismaService.address.delete({
      where: { id: removeRequest.address_id },
    });

    return this.toAddressResponse(address);
  }

  async list(user: User, contactId: number): Promise<AddressResponse[]> {
    await this.contacService.checkContactMustExists(user.username, contactId);
    const addresses = await this.prismaService.address.findMany({
      where: { contact_id: contactId },
    });

    return addresses.map((address) => this.toAddressResponse(address));
  }
}
