import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class HashingService {
    async hash(value: string) {
        return hash(value, saltRounds);
    }

    async compare(value: string, hashedValue: string) {
        return compare(value, hashedValue);
    }
}
