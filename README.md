# kinda
All Kinds Montessori internal web app.

## Author
Adam Ballinger

## Models

1. Transaction
    - _id: ObjectID
    - debits: []
    - credits: []
    - description: ""

2. Student
    - _id: ObjectID
    - name: ""

3. CheckIn
    - _id: ObjectID
    - student: ObjectID
    - timeIn: Date
    - timeOut: Date

## Views

- check-in.html

    Check students in, view open check-ins, close open check-ins

- check-ins.html

    Read check-ins

- students.html

    Create, read, update, delete students

- payments.html

    create and read payments

- expenses.html

    create and read expenses

- transactions.html

    Create, read, update, and delete transactions

## Controllers

GET: /check-ins
GET: /check-ins/:id
POST: /check-ins
PATCH: /check-ins/:id
DELETE: /check-ins/:id

GET: /students
GET: /students/:id
POST: /students
PATCH: /students/:id
DELETE: /students/:id

GET: /transactions
GET: /transactions/:id
POST: /transactions
PATCH: /transactions/:id
DELETE: /transactions/:id
