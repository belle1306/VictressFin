require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "focaldb",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

// " "
  let sql = "DROP DATABASE IF EXISTS focaldb ; CREATE DATABASE focaldb; USE focaldb; CREATE TABLE `organizations` (`oid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`name` varchar(255) NOT NULL,`address1` varchar(255),`address2` varchar(255),`website` varchar(255) NOT NULL,`telephone` varchar(25),`busregistration_num` varchar(50),`taxnum` varchar(50)); "
    + "CREATE TABLE `users` (`uid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`email` varchar(100) NOT NULL UNIQUE,`firstname` varchar(100) NOT NULL,`lastname` varchar(100) NOT NULL,`password` varchar(200) NOT NULL,`group` varchar(50) NOT NULL DEFAULT 'organizers',`organization_id` int,`contactnum` varchar(50),`address1` varchar(255),`address2` varchar(255),`state` varchar(100),`country` varchar(100) DEFAULT 'Malaysia', `postcode` varchar(50), `googlesso` BOOLEAN DEFAULT 0,	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`oid`)); "
    + "CREATE TABLE `events` (`eid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`organizer_id` int NOT NULL,`name` varchar(255) NOT NULL, dateto DATE, datefrom DATE, `closingdate` DATE,`location` varchar(200),`status` varchar(20) DEFAULT 'active',`description` TEXT NOT NULL,`images` TEXT,`contactname` varchar(255),`contactnum` varchar(100), `contactemail` varchar(200), `totalvolunteer` int NOT NULL, `totalfunds` int NOT NULL, FOREIGN KEY (`organizer_id`) REFERENCES `users`(`uid`)); "
    + "CREATE TABLE `volunteers` (`vid` int NOT NULL AUTO_INCREMENT PRIMARY KEY,`event_id` int NOT NULL,`email` varchar(100) NOT NULL,`firstname` varchar(100) NOT NULL,`lastname` varchar(100) NOT NULL,`contactnum` varchar(50),`address1` varchar(255),`address2` varchar(255),`state` varchar(100),	`country` varchar(100) DEFAULT 'Malaysia',	`postcode` varchar(50),	`nextsignup` BOOLEAN,`dateapp` DATE,`dateproc` DATE,`status` varchar(15) DEFAULT 'new', FOREIGN KEY (`event_id`) REFERENCES `events`(`eid`)); "
    
  let sqlInsert = "insert into organizations (name, website, telephone) values ('Cikgu Harry Bikal', 'https://www.thestar.com.my/news/nation/2020/07/13/superhero-teacher-looking-for-supporters', ''), ('Womens Aid Organisation', 'https://wao.org.my/', 'info@wao.org.my'), ('Meena Studio', 'Instagram @shopmeenastudio', '0196691881'), ('House of Hope', 'https://www.facebook.com/houseofhopepenang', '048264826'), ('Personal/Individual', 'N/A', null), ('Others', 'N/A', null); "
    + "insert into users (email, firstname, lastname, password, organization_id, googlesso) values ('test@gmail.com', 'Isabelle', 'Francis', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 6, 0), ('test2@gmail.com', 'Logesh Kumar ', 'Sethuraman', '$2b$07$LwVuRvHH7comkN2KcH3D1emTZA6LnhpNQpVpVQaE0DAfE7EUzMHbW', 2, 0), ('esmemarie.sultan@gmail.com', 'Esme', 'S.', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 4, 1), ('jannahworks@gmail.com', 'Jannah', 'A.', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 5, 1), ('test3@gmail.com', 'Joe', 'Madis', '$2b$07$49aRDpd9GFjGn8vgt0NxNu7phrRn3UHN.6mRJybaESNceGyknbKfe', 5, 0);"
    + "insert into events (name, closingdate, status, description, location, organizer_id, contactname, contactnum, totalvolunteer, totalfunds, images) values ('TechSprint Academy', '2021-06-30', 'active', 'TechSprint invites women to join Rebound and discover their new superpowers and build a stronger support network and community of women in tech and business.', 'Kuala Lumpur', 1, 'Ms. Vani', '6012 207 5252', 2, 500000, 'https://firebasestorage.googleapis.com/v0/b/sejiwa-focal.appspot.com/o/pexels-mentatdgt-1206059.jpg?alt=media&token=e4ec3b8e-391f-4893-9e13-b2766416a7b1'), ('TeknoPie', '2021-12-31', 'active', 'Educational technology for rural areas and students with learning difficulties.',  'Nationwide, Malaysia', 1, 'Isabelle Francis', '0163221306', 0, 1000000, 'https://hippocampus203439875.files.wordpress.com/2020/09/smk-tldj-students-using-android-to-access-kalite.jpg?w=257&zoom=2'), ('IIX Women Livelihood Bonds', '2021-06-30', 'active', 'Will be listed on a the Singapore Exchange, creating sustainable livelihoods for 250,000+ underserved women in the region.',  'Singapore', 1, 'Isabelle Francis', '0163221306', 0, 1000000, 'https://firebasestorage.googleapis.com/v0/b/sejiwa-focal.appspot.com/o/pexels-pew-nguyen-2892373.jpg?alt=media&token=e71a888e-f913-4759-bceb-3ff0ecabb814'), ('#GirlsForGoalsChallenge', '2021-06-30', 'active', 'In these challenging times, girls from marginalised communities are facing great difficulties in accessing hygiene products and maintaining their health. As such, Women’s Aid Organisation (WAO) has launched the #GirlsForGoalschallenge to raise awareness of girls’ rights and to provide self-care packages to girls from underserved communities in Malaysia. Through the campaign, WAO aims to raise RM 23,000, which would fund self-care packages consisting of hygiene products and health supplements for 230 girls. To ensure the sustainability of the programme, girls who receive the self-care packages can also subsequently join an online platform that provides a space for them to have conversations about their rights and develop connections, as well as to participate in a sports training programme with built-in human rights awareness.',  'Malaysia', 2, 'Isabelle Francis', '0163221306', 0, 23000, 'https://firebasestorage.googleapis.com/v0/b/sehati-sejiwa.appspot.com/o/michael-fenton-0ZQ8vojHNuc-unsplash.jpg?alt=media&token=597b6edf-49b3-45b6-a589-5e6511b8711b'), ('Workshops by Meena Studio', '2021-07-30', 'active', 'We are looking for funding to organize workshops for young girls to expand their creativity & teach them the art of making jewelry. We also need funds to grow our business to the international market. A little bit about us: Meena studio is a contemporary hand-crafted jewelry brand born from the desire to redefine modernity and empower women to express their authentic selves. Meena Studio believes in a slow-fashion approach, designing and making each piece with care and detail from start to finish..',  'Malaysia', 3, 'Khalilah', '0162223333', 0, 20000, 'https://firebasestorage.googleapis.com/v0/b/sejiwa-focal.appspot.com/o/meenastudiohandicraft.jpeg?alt=media&token=fea28cf5-e082-4dfd-b099-a9d0e3f7833c'), ('Children Books by Aspiring Children Writers', '2021-11-30', 'active', 'Children Book Writers Club Kota Kinabalu will be compiling short children stories writen by their very own young members for book publishing. All proceeds from the sale of books will be donated to the Support A Child Programme by Caring For The Future Malaysia (CFF): www.cffmalaysia.org.',  'Malaysia', 1, 'Esme-Marie', '0112220080', 0, 15000, 'https://firebasestorage.googleapis.com/v0/b/sejiwa-focal.appspot.com/o/child-reading.jpg?alt=media&token=f4d86b14-1742-46ea-8e67-42e230b0a0d9'); "
    + "insert into volunteers (event_id, email, firstname, lastname, contactnum, dateapp, status) values (1, 'volone@gmail.com', 'Jas', 'Gan', '0123456789', NOW() - INTERVAL 3 DAY, 'accepted'), (1, 'voltwo@gmail.com', 'Delima', 'Merah', '0123243355', NOW() - INTERVAL 2 DAY, 'new'), (1, 'volthree@gmail.com', 'Selamat', 'Lizam', '0178886654', NOW() - INTERVAL 2 DAY, 'new'), (1, 'volfour@gmail.com', 'Moon', 'Tan',  '0197696945', NOW() - INTERVAL 1 DAY, 'new');";

  con.query(sql + sqlInsert, function(err, result) {
    if (err) throw err;
    console.log("Tables creation with dummy data for 'focaldb' db was successful!");

    console.log("Closing...");
  });

  con.end();
});
