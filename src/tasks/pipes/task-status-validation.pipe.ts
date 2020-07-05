import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowStatuses = [
        TaskStatus.OPEN,
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
    ]

    transform(value: any) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException('Status is not valid')
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowStatuses.indexOf(status);
        return index !== -1;
    }
}