import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

    // We have a parameter named taskService, nest creates a private
    // which can be accessed with this.sarkService
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
      if(Object.keys(filterDto).length){
        return this.tasksService.getTasksWithFilters(filterDto);
      }
      return this.tasksService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
      return this.tasksService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task {
      return this.tasksService.getTaskById(id); 
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string): string {
      return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id:string, 
      @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Task {
      console.log(status)
      return this.tasksService.updateTaskStatus(id,status);
    }

}
