import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { CloudService } from '../Services/cloud.service';
import { IImage } from 'src/DB/Models/Category';

@Injectable()
export class CloudInterceptor implements NestInterceptor {
  constructor(private readonly cloudService: CloudService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const file = request.file as Express.Multer.File;
    // const files = request.files as Express.Multer.File[];
    if (file) {
      const folderId = Math.ceil(Math.random() * 10000 + 9999).toString();
      const { secure_url, public_id } = await this.cloudService.uploadFile({
        path: file.path,
        folder: folderId,
      });
      request.body.image = { secure_url, public_id, folderId };
    }
    return next.handle().pipe(
      catchError((err) => {
        console.log(err);

        // logic code
        if (file) this.cloudService.deleteFolder(request.body.image.folderId);
        return throwError(() => err);
      }),
    );
  }
}

@Injectable()
export class CloudInterceptorMultiFiles implements NestInterceptor {
  constructor(private readonly cloudService: CloudService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const files = request.files as Express.Multer.File[];
    console.log({ files });
    
    if (files.length) {
      const folderId = Math.ceil(Math.random() * 10000 + 9999).toString();
      const images: IImage[] = [];
      for (const file of files) {
        const { secure_url, public_id } = await this.cloudService.uploadFile({
          path: file.path,
          folder: folderId,
        });
        images.push({ secure_url, public_id });
        
      }

      request.body.images = images;
      request.body.folderId = folderId;
    }
    return next.handle().pipe(
      catchError((err) => {
        console.log(err);

        // logic code
        if (files.length) this.cloudService.deleteFolder(request.body.folderId);
        return throwError(() => err);
      }),
    );
  }
}
