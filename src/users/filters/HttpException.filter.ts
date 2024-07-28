import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { timestamp } from "rxjs";

@Catch(HttpException)
export class HttpExceptionFilter implements
ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        

        response.send({
            statusCode : exception.getStatus(),
            message : exception.getResponse(),
        })

    }
}