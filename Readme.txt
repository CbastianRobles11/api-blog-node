
//registrarse
post localhost:5001/api/auth/register

//autenticarse
post localhost:5001/api/auth/login

//update user
put localhost:5001/api/users/:id
{
    "userId":"614f7d13d5e866c058e4fb66",
    "username":"admin1",
    "password":"12345678"
}


//get user
get localhost:5001/api/users/:id


//delete user
delete : localhost:5001/api/users/614f7d13d5e866c058e4fb66
{
    "userId":"614f7d13d5e866c058e4fb66",
    "username":"admin1",
    "password":"12345678"
}

//post/////////////////////////




///CATEGORIES/////////////

//GET CATEGORIES
get localhost:5001/api/categories

//AGREGAR CATEGORIES
 POST localhost:5001/api/categories
{
    "name":"Test1"
}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////// IMAGEnes
 trabajare con multer
 
