import { Controller, Get } from "@nestjs/common";
import { WebService } from "./web.service";

@Controller()
export class WebController {
  constructor(private readonly webService: WebService) {}

  @Get('initNews')
  initNews() {
    return this.webService.initNews();
  }

  @Get('newsList')
  getNewsList() {
    return this.webService.getNewsList();
  }
}