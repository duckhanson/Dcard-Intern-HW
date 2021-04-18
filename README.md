# 2021 Web Frontend Intern Homework
## 如何啟動
### Compile
```
    npm install
```
### Start
```
    npm run start
```
#### Open the web page with url: http://localhost:7070/ , simply click the left link or copy to the browser.

### On the page
* Mode 1 - Click button: [All Spots] on the navigator, the table will refresh to show the All Spots List.

* Mode 2 - Click button: [City] on the navigator and choose a city, the table will refresh to show the City Spots List.

* On each mode, we can scroll the table, and refresh the table to get the new 30 spots.


## 架構的設計
1. 將page分成navigator, table, footer。
2. 在navigator中設計出下拉的清單city，並使用Router使url可以隨table呈現區分成不同url。
3. 在table (SpotTable)中使用api/motc-spot做request，並使用InfiniteScroll 製造出重複request的現象。

