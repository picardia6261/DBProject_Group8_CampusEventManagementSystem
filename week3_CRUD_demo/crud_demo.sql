-- CRUD for Organizer table

mysql> INSERT INTO organizer (OrgName, OrgPhone, OrgRole) VALUES
    -> ('bem km fmipa', '081234567801', 'Host'),
    -> ('GDGoC UGM', '081234567802', 'Partner'),
    -> ('OmahTI', '081234567803', 'Tech Team'),
    -> ('himakom', '081234567804', 'Committee'),
    -> ('bem km ugm', '081234567805', 'Coordinator');
Query OK, 5 rows affected (0.042 sec)
Records: 5  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM organizer;
+-------+--------------+--------------+-------------+
| OrgID | OrgName      | OrgPhone     | OrgRole     |
+-------+--------------+--------------+-------------+
|     1 | bem km fmipa | 081234567801 | Host        |
|     2 | GDGoC UGM    | 081234567802 | Partner     |
|     3 | OmahTI       | 081234567803 | Tech Team   |
|     4 | himakom      | 081234567804 | Committee   |
|     5 | bem km ugm   | 081234567805 | Coordinator |
+-------+--------------+--------------+-------------+
5 rows in set (0.008 sec)

mysql> UPDATE organizer
    -> SET OrgPhone = '08999999999'
    -> WHERE OrgID = 1;
Query OK, 1 row affected (0.010 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM organizer;
+-------+--------------+--------------+-------------+
| OrgID | OrgName      | OrgPhone     | OrgRole     |
+-------+--------------+--------------+-------------+
|     1 | bem km fmipa | 08999999999  | Host        |
|     2 | GDGoC UGM    | 081234567802 | Partner     |
|     3 | OmahTI       | 081234567803 | Tech Team   |
|     4 | himakom      | 081234567804 | Committee   |
|     5 | bem km ugm   | 081234567805 | Coordinator |
+-------+--------------+--------------+-------------+
5 rows in set (0.001 sec)

mysql> DELETE FROM organizer
    -> WHERE OrgID = 1;
Query OK, 1 row affected (0.005 sec)

mysql> SELECT * FROM organizer;
+-------+------------+--------------+-------------+
| OrgID | OrgName    | OrgPhone     | OrgRole     |
+-------+------------+--------------+-------------+
|     2 | GDGoC UGM  | 081234567802 | Partner     |
|     3 | OmahTI     | 081234567803 | Tech Team   |
|     4 | himakom    | 081234567804 | Committee   |
|     5 | bem km ugm | 081234567805 | Coordinator |
+-------+------------+--------------+-------------+
4 rows in set (0.001 sec)

-- CRUD for Venue table

mysql> INSERT INTO venue (VenueName, Location, Capacity) VALUES
    -> ('auditorium rmjt soehakso', 'jl. sains', 250),
    -> ('auditorium herman yohanes', 'jl. sains', 300),
    -> ('gik ugm', 'jl. monjali', 200),
    -> ('sic fmipa ugm', 'jl. malioboro', 120),
    -> ('Balairung UGM', 'jl. agro', 800),
    -> ('GSP UGM', 'bundaran ugm', 400);
Query OK, 6 rows affected (0.018 sec)
Records: 6  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM venue;
+---------+---------------------------+---------------+----------+
| VenueID | VenueName                 | Location      | Capacity |
+---------+---------------------------+---------------+----------+
|       1 | auditorium rmjt soehakso  | jl. sains     |      250 |
|       2 | auditorium herman yohanes | jl. sains     |      300 |
|       3 | gik ugm                   | jl. monjali   |      200 |
|       4 | sic fmipa ugm             | jl. malioboro |      120 |
|       5 | Balairung UGM             | jl. agro      |      800 |
|       6 | GSP UGM                   | bundaran ugm  |      400 |
+---------+---------------------------+---------------+----------+
6 rows in set (0.024 sec)

mysql> UPDATE venue
    -> SET Capacity = 350
    -> WHERE VenueID = 1;
Query OK, 1 row affected (0.006 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM venue;
+---------+---------------------------+---------------+----------+
| VenueID | VenueName                 | Location      | Capacity |
+---------+---------------------------+---------------+----------+
|       1 | auditorium rmjt soehakso  | jl. sains     |      350 |
|       2 | auditorium herman yohanes | jl. sains     |      300 |
|       3 | gik ugm                   | jl. monjali   |      200 |
|       4 | sic fmipa ugm             | jl. malioboro |      120 |
|       5 | Balairung UGM             | jl. agro      |      800 |
|       6 | GSP UGM                   | bundaran ugm  |      400 |
+---------+---------------------------+---------------+----------+
6 rows in set (0.001 sec)

mysql> DELETE FROM venue
    -> WHERE VenueID = 1;
Query OK, 1 row affected (0.011 sec)

mysql> SELECT * FROM venue;
+---------+---------------------------+---------------+----------+
| VenueID | VenueName                 | Location      | Capacity |
+---------+---------------------------+---------------+----------+
|       2 | auditorium herman yohanes | jl. sains     |      300 |
|       3 | gik ugm                   | jl. monjali   |      200 |
|       4 | sic fmipa ugm             | jl. malioboro |      120 |
|       5 | Balairung UGM             | jl. agro      |      800 |
|       6 | GSP UGM                   | bundaran ugm  |      400 |
+---------+---------------------------+---------------+----------+
5 rows in set (0.002 sec)

-- CRUD for Student table

mysql> INSERT INTO student (StudentName, StudentEmail, StudentPhone) VALUES
    -> ('christiano jose', 'christiano@ugm.ac.id', '0811111111'),
    -> ('farhan adiwidya', 'farhan@ugm.ac.id', '0812222222'),
    -> ('matthew harry', 'matthew@ugm.ac.id', '0813333333'),
    -> ('edi winarko', 'edi@ugm.ac.id', '0814444444'),
    -> ('ari azhari', 'ari@ugm.ac.id', '0815555555');
Query OK, 5 rows affected (0.006 sec)
Records: 5  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM student;
+-----------+-----------------+----------------------+--------------+
| StudentID | StudentName     | StudentEmail         | StudentPhone |
+-----------+-----------------+----------------------+--------------+
|         1 | christiano jose | christiano@ugm.ac.id | 0811111111   |
|         2 | farhan adiwidya | farhan@ugm.ac.id     | 0812222222   |
|         3 | matthew harry   | matthew@ugm.ac.id    | 0813333333   |
|         4 | edi winarko     | edi@ugm.ac.id        | 0814444444   |
|         5 | ari azhari      | ari@ugm.ac.id        | 0815555555   |
+-----------+-----------------+----------------------+--------------+
5 rows in set (0.001 sec)

mysql> UPDATE student
    -> SET StudentPhone = '08880001122'
    -> WHERE StudentID = 1;
Query OK, 1 row affected (0.005 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM student;
+-----------+-----------------+----------------------+--------------+
| StudentID | StudentName     | StudentEmail         | StudentPhone |
+-----------+-----------------+----------------------+--------------+
|         1 | christiano jose | christiano@ugm.ac.id | 08880001122  |
|         2 | farhan adiwidya | farhan@ugm.ac.id     | 0812222222   |
|         3 | matthew harry   | matthew@ugm.ac.id    | 0813333333   |
|         4 | edi winarko     | edi@ugm.ac.id        | 0814444444   |
|         5 | ari azhari      | ari@ugm.ac.id        | 0815555555   |
+-----------+-----------------+----------------------+--------------+
5 rows in set (0.001 sec)

mysql> DELETE FROM student
    -> WHERE StudentID = 1;
Query OK, 1 row affected (0.102 sec)

mysql> SELECT * FROM student;
+-----------+-----------------+-------------------+--------------+
| StudentID | StudentName     | StudentEmail      | StudentPhone |
+-----------+-----------------+-------------------+--------------+
|         2 | farhan adiwidya | farhan@ugm.ac.id  | 0812222222   |
|         3 | matthew harry   | matthew@ugm.ac.id | 0813333333   |
|         4 | edi winarko     | edi@ugm.ac.id     | 0814444444   |
|         5 | ari azhari      | ari@ugm.ac.id     | 0815555555   |
+-----------+-----------------+-------------------+--------------+
4 rows in set (0.001 sec)

-- CRUD for Event Table

mysql> INSERT INTO event (OrgID, VenueID, EventName, EventStatus, Category, EventDate) VALUES
    -> (2, 2, 'GDGoC Tech Workshop', 'Published', 'Technology', '2025-02-10 13:00:00'),
    -> (3, 3, 'OmahTI Coding Bootcamp', 'Draft', 'Education', '2025-03-05 08:30:00'),
    -> (4, 4, 'Himakom Data Science Talk', 'Published', 'Seminar', '2025-04-20 10:00:00'),
    -> (5, 5, 'BEM KM UGM Leadership Seminar', 'Draft', 'Leadership', '2025-05-18 14:00:00');
Query OK, 4 rows affected (0.063 sec)
Records: 4  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM event;
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
| EventID | OrgID | VenueID | EventName                     | EventStatus | Category   | EventDate           |
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
|       1 |     2 |       2 | GDGoC Tech Workshop           | Published   | Technology | 2025-02-10 13:00:00 |
|       2 |     3 |       3 | OmahTI Coding Bootcamp        | Draft       | Education  | 2025-03-05 08:30:00 |
|       3 |     4 |       4 | Himakom Data Science Talk     | Published   | Seminar    | 2025-04-20 10:00:00 |
|       4 |     5 |       5 | BEM KM UGM Leadership Seminar | Draft       | Leadership | 2025-05-18 14:00:00 |
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
4 rows in set (0.007 sec)

mysql> UPDATE event
    -> SET EventStatus = 'Closed'
    -> WHERE EventID = 1;
Query OK, 1 row affected (0.215 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM event;
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
| EventID | OrgID | VenueID | EventName                     | EventStatus | Category   | EventDate           |
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
|       1 |     2 |       2 | GDGoC Tech Workshop           | Closed      | Technology | 2025-02-10 13:00:00 |
|       2 |     3 |       3 | OmahTI Coding Bootcamp        | Draft       | Education  | 2025-03-05 08:30:00 |
|       3 |     4 |       4 | Himakom Data Science Talk     | Published   | Seminar    | 2025-04-20 10:00:00 |
|       4 |     5 |       5 | BEM KM UGM Leadership Seminar | Draft       | Leadership | 2025-05-18 14:00:00 |
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
4 rows in set (0.006 sec)

mysql> DELETE FROM event
    -> WHERE EventID = 1;
Query OK, 1 row affected (0.019 sec)

mysql> SELECT * FROM event;
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
| EventID | OrgID | VenueID | EventName                     | EventStatus | Category   | EventDate           |
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
|       2 |     3 |       3 | OmahTI Coding Bootcamp        | Draft       | Education  | 2025-03-05 08:30:00 |
|       3 |     4 |       4 | Himakom Data Science Talk     | Published   | Seminar    | 2025-04-20 10:00:00 |
|       4 |     5 |       5 | BEM KM UGM Leadership Seminar | Draft       | Leadership | 2025-05-18 14:00:00 |
+---------+-------+---------+-------------------------------+-------------+------------+---------------------+
3 rows in set (0.001 sec)

-- CRUD for Registration table 

mysql> INSERT INTO registration (StudentID, EventID, RegStatus) VALUES
    -> (2, 2, 'Registered'),
    -> (3, 3, 'Registered'),
    -> (4, 4, 'Registered'),
    -> (5, 5, 'Registered'),
    -> (6, 6, 'Registered');
Query OK, 5 rows affected (0.006 sec)
Records: 5  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM registration;
+-----------+---------+---------------------+------------+
| StudentID | EventID | RegDate             | RegStatus  |
+-----------+---------+---------------------+------------+
|         2 |       2 | 2025-11-21 23:45:18 | Registered |
|         3 |       3 | 2025-11-21 23:45:18 | Registered |
|         4 |       4 | 2025-11-21 23:45:18 | Registered |
|         5 |       5 | 2025-11-21 23:45:18 | Registered |
|         6 |       6 | 2025-11-21 23:45:18 | Registered |
+-----------+---------+---------------------+------------+
5 rows in set (0.019 sec)

mysql> UPDATE registration
    -> SET RegStatus = 'Cancelled'
    -> WHERE StudentID = 2 AND EventID = 2;
Query OK, 1 row affected (0.095 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT * FROM registration;
+-----------+---------+---------------------+------------+
| StudentID | EventID | RegDate             | RegStatus  |
+-----------+---------+---------------------+------------+
|         2 |       2 | 2025-11-21 23:45:18 | Cancelled  |
|         3 |       3 | 2025-11-21 23:45:18 | Registered |
|         4 |       4 | 2025-11-21 23:45:18 | Registered |
|         5 |       5 | 2025-11-21 23:45:18 | Registered |
|         6 |       6 | 2025-11-21 23:45:18 | Registered |
+-----------+---------+---------------------+------------+
5 rows in set (0.006 sec)

mysql> DELETE FROM registration
    -> WHERE StudentID = 2 AND EventID = 2;
Query OK, 1 row affected (0.006 sec)

mysql> SELECT * FROM registration;
+-----------+---------+---------------------+------------+
| StudentID | EventID | RegDate             | RegStatus  |
+-----------+---------+---------------------+------------+
|         3 |       3 | 2025-11-21 23:45:18 | Registered |
|         4 |       4 | 2025-11-21 23:45:18 | Registered |
|         5 |       5 | 2025-11-21 23:45:18 | Registered |
|         6 |       6 | 2025-11-21 23:45:18 | Registered |
+-----------+---------+---------------------+------------+
4 rows in set (0.001 sec)
