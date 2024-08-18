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
    <code>notices</code> table contains the following columns <br/>
    <code>id</code> which is the id of the comment <br/>
    <code>notice_id</code> which is the id of the notice where user comments<br/>
    <code>user_id</code> which is the id of the user who comment on the notice<br/>
    <code>date</code> which is the date of the comment<br/>
    <code>description</code> which is the descriptions of the comment<br/>
</details>
