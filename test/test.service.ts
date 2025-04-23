import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { Contact, User } from 'generated/prisma';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteContact();
    await this.deleteUser();
  }
  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async deleteContact() {
    await this.prismaService.contact.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async getUser(): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        username: 'test',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        password: await bcrypt.hash('test', 10),
        name: 'test',
        token: 'test',
      },
    });
  }

  async getContact(): Promise<Contact | null> {
    return await this.prismaService.contact.findFirst({
      where: {
        username: 'test',
      },
    });
  }

  async createContact() {
    await this.prismaService.contact
      .create({
        data: {
          first_name: 'test',
          last_name: 'test',
          email: 'test@example.com',
          phone: '123123123',
          username: 'test',
        },
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
