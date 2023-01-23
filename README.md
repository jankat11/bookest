# BOOKEST

### **Introduction:**
This web site provides to get information about all the books on the internet using Google and New York Times API's, to look at reader comments, to link to other websites that give detailed information about the relevant book, and to create a personal library. The site also has its own user comments section as well.

Where all books mean all books with the international book code isbn number. [ISBN](https://en.wikipedia.org/wiki/ISBN) is like an identification number for every book in the world. That is, information about all old/new books published in all languages in all countries of the world can be obtained from this site. This also includes e-books.

### **Distinctiveness and Complexity:**
This site is **not** a commerce or social media site. It is a site that contains some useful tools for book lovers.

It is a fact that there are many websites about books. As a book lover, I find most of this tedious. And I thought of making a web site that I can use myself. The most striking feature on this site, which I will use from now on, is the personal library feature. Because, besides being visually entertaining, this library provides great convenience to the person by putting the books on separate shelves.

There are two important bookshelves: 'will be read' and 'has been read'. Users can regulate their own reading habits thanks to the books they put on these shelves when they log in to their accounts. By putting a book they like on the 'will be read' list, they archive it and don't forget it. They can also see how many books they have read so far by adding the books on 'has been read' shelf.

Another unique feature that sets the site apart from others, which is entirely my own idea, is the antique and modern theme design. In a way, this is similar to the light and dark mode, but since it is a book site, I adapted it as an antique and modern mode. My longest function codes, which took hundreds of lines of Javascript, were for this theme separation of the site. The modern theme includes simpler and less tiring colors. The shelves and the background photos on the site resemble modern bookcases in today's homes. In the antique theme, brown and yellow tones stand out more. It gives a slightly dusty and old feel and stands in front of the user with a more complex image. I also put candles on top of the books to reinforce the antique look on the main page. books are partially illuminated by a lit candle when hovered over them.

Two different APIs are used on this site, one from New York Times and the other from Google, to access information about books. The reason there are two is because they both have different useful properties. New York Times API offers a wide range of book types and categories. I get current trends and best seller books on the site with this API. On the other hand, google provides a vast data repository for the archives and cover photos of almost every book in the world. I also worked with google API for this. According to the user's request on the site, the two APIs work in harmony with each other and provide the necessary information. I designed the project so that some API requests are in the back end - Django, and some are on the front end - JavaScript. However, most requests are provided on the front end. In this complex design, in addition to the experience I gained in the course and the personal design paradigm, the speed factor was also effective in my decision.

Users can write their own reviews of books. Of course, reader review is a feature of some major websites these days. However, users will write more intense comments to the extent that they like this website, and perhaps according to the branding success of the site in the future. The site also has external links for reader reviews on other sites. For example, the user can read reviews about the book through a link from Amazon or be directed there for the book they want to buy.

I gave great importance to mobile responsive in the design of the site. The site is simulated on all iOS and Android devices by browser tool. In terms of UX and UI, I'm sure it meets the requirements at least minimally. On phone and tablet devices, the top bar gets smaller and a separate menu icon appears. book and shelf sizes also change according to the size of the device or turn into a different design. In addition, after deploying the site to another server, I will continue to fix the mobile design and errors, if any, according to the feedback.

### **Files i created:**
This Django project has one app named books. In that folder there exist 'static' and 'templates' folders and below some python files i created. In static folder:
- **images:** A folder contains all images and some thumbnails for html image src.
- **script.js:**: The longest programming language file in this project. In this file, there exist all front end issues, functions switching between themes, some requests/fetch functions handling events, changing html elements, button clickings, some alert messages etc..  
- **styles.css:** A css file linked in layout.html. This is the only file for styling so includes all styling issues (more than 500 lines of codes). 

In templates folder:
- **layout.html:** Has some static and styless links, bootstrap link, page header design and navbar.
- **index.html:** Opening the web site, this page is for rendering best seller books and looking some genres
- **login.html:** Page to login with account.
- **register.html:** Page to create an account.
- **book.html:** A page for specific book clicked on. It has some tools about book -external links, about book section, reviews, adding bookshelf etc..
- **myBooks.html:** This is the library page for user. it has bookshelves to put.
- **myReviews.html:** This page shows all reviews belongs to user. 
- **search.html:** Renders results of search.

Python files:
- **views.py:** The main python file handles most issues. It has all functions for all routes for all html pages.
- **util.py:** A helper file i created to supply some functions to views.py. It has two API function for requests.  
- **urls.py:** Includes all url routes for book app.
- **models.py:** There exist four ORM model: User, Book, Bookshelf and Review. 
- **admin.py:** I added some settings for admin site.

Other files:
- **db.sqlite3:** Not necessary but it was created during some testing events so i did not delete it. There exist some sample user accounts.
- **README.md:** This file i created with given instructions.
- **requirements.txt:** i created it with pip freeze. It lists all external library names to run project. 

### **How to run application:**
This project requires two external libraries: **django** and **requests**. i only run this application on its own virtual environment. So all libraries in requirements.txt are related only these two libraries. Also there exist a sqlite file so no need to migrate anything with starting. It is enough to run command **python manage.py runserver** in an appropriate environment.

### Additional Notes:
I made this project with latest version of django as seen in requirements.txt (Django==4.0.6). I did not try to run it in old versions of django so not sure it could be run or not if django version is old.

By the way, lastly, I would like to thank all you staff at the end of the course. I learned a lot from your course. I'm sure it will work in my professional life as well.









