import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class WebService {
  private readonly _category = mongoose.model("Category");
  private readonly _article = mongoose.model("Article");
  // private readonly _hero = mongoose.model("Hero");

  public async initNews() {
    const parentCats = await this._category.findOne({
      name: "新闻资讯"
    });

    const cats = await this._category.find().where({
      parent: parentCats
    }).lean();

    const newsTitles =  ["《目标》·新英雄澜CG", "【获奖公示】设计、视频、音乐赛道获奖名单——王者荣耀风物志共创大赛", "如果有一个可以跟王者策划零距离“对线”交流的机会，你会……", "【获奖公示】云阁绮霞 -王者荣耀风物志插画漫画大赛", "新皮肤爆料｜守护万千星河，云上仙君新装登场！", "12月12日体验服停机更新公告", "“风物志对话小说赛道”获奖作品问题说明公告", "12月12日组队语音卡顿异常说明", "12月11日体验服停机更新公告", "12月10日体验服停机更新公告", "新英雄澜登场，冬日聚峡谷对战赢好礼", "王者创意互动周好礼来袭 云中君-纤云弄巧限时秒杀", "【手Q独家】商城限时免单", "感恩节快乐，参与活动领缤纷好礼", "挑战绝悟赢荣誉称号，S17赛季战令限时返场", "秋季赛总决赛门票今日12:00全面开售！重山之上，一战成王！", "成都AG超玩会晋级决赛！12月19日会师DYG决战重庆，看谁能问鼎巅峰！", "决赛见！DYG力克成都AG，锁定总决赛名额！成都AG错失晋级掉入败者组", "第一视角进入教程，来营地看一诺、小义细微操作！见证决赛名额诞生！", "四强集结！12月4日季后赛第二周重庆开战，一起见证总决赛战队诞生！"];
    const newsList = newsTitles.map(v => {
      //get random data from array
      const randomCats = cats.slice(0).sort((a,b) => Math.random()-0.5);

      return {
        categories: randomCats.slice(0,2),
        title: v
      }
    });

    await this._article.deleteMany({});
    await this._article.insertMany(newsList);

    return newsList;
  }


  public async getNewsList() {
    const allNews = await this._category.findOne({
      name: "新闻资讯"
    });

    console.log(allNews)
    const cats = await this._category.aggregate([
      { $match: {parent: allNews._id} },
      { 
        $lookup: {
          from: "articles",   //Article collection -> articels
          localField: "_id",
          foreignField: "categories",
          as: "newsList"
        } 
      },
      {
        //modify or add field
        $addFields: {
            newsList: {$slice: ["$newsList", 5]}  //copy five news from newsList field to newsList
        }
      }
    ]); 

    //add five news before array
    const subCats = cats.map(v => v._id);
    cats.unshift({
      name: "热门",
      newsList: await this._article.find().where({
          categories: { $in: subCats }
      }).populate("categories").limit(5).lean()
    });

    //add categoryName in categories
    cats.map(cat => {
      cat.newsList.map(news => {
          news.categoryName = cat.name === "热门" ? news.categories[0].name : cat.name ;
          return news;
      });

      return cat;
    });

    return cats;
  }
}