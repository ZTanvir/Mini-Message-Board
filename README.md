# Mini Message Board

Our notice board app is your go-to platform for staying connected with your community. Receive timely notifications about events, announcements, and important updates. Easily share information with others and create a vibrant digital noticeboard.

## Database

ER diagram for mini message board.

![ER Diagram](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

Within messageBoard.db you will find the following tables.Click the drop-downs below to learn more about the schema of each individual table.

<details>
    <summary><code>users</code> table</summary>
    <code>users</code> table contains the following columns <br/>
    <code>id</code> which is the id of the user <br/>
    <code>first_name</code> which is the first name of the user <br/>
    <code>last_name</code> which is the last name of the user <br/>
</details>

<details>
    <summary><code>notices</code> table</summary>
    <code>notices</code> table contains the following columns <br/>
    <code>id</code> which is the id of the notice <br/>
    <code>user_id</code> which is the id of the user who created the notice <br/>
    <code>title</code> which is the title of the notice <br/>
    <code>date</code> which is the date when the notice created<br/>
    <code>description</code> which is the description of the notice <br/>
</details>

<details>
    <summary><code>comments</code> table</summary>
    <code>comments</code> table contains the following columns <br/>
    <code>id</code> which is the id of the comment <br/>
    <code>notice_id</code> which is the id of the notice where user comments<br/>
    <code>user_id</code> which is the id of the user who comment on the notice<br/>
    <code>date</code> which is the date of the comment<br/>
    <code>description</code> which is the descriptions of the comment<br/>
</details>

## Endpoints

REST Resource: notice<br/>
<code>https://url/api</code><br/>

| Methods |                                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| get     | GET /notice Gets information about the id,user_id,title,date,descrtiption for notice                              |
| get     | GET /notice/:noticeId Gets notice id,user_id,title,date,descrtiption which match the noticeId                     |
| post    | POST /notice/new Create a new notice Send user_id,title,date,descrtiption to request body                         |
| Update  | UPDATE /notice/:noticeId Update the notice which match the parameter id send id,title,description to request body |
| Delete  | Delete /notice/:noticeId Delete the notice which match the parameter id                                           |

</br>

REST Resource: comment<br/>
<code>https://url/api/notice/:noticeId</code><br/>

| Methods |                                                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| get     | GET /comment/:commentId Gets information about the id,notice_id,user_id,date,descrtiption for comment                       |
| post    | POST /comment/:commentId Create a new comment Send notice_id,user_id,title,date,descrtiption to request body                |
| Update  | UPDATE /comment/:commentId Update the comment which match the parameter commentId send id,title,description to request body |
| Delete  | Delete /comment/:commentId Delete the comment which match the parameter id                                                  |
