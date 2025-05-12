Vera Kippel veki2400

Detta moment är ett API som innehåller funktonalitet (POST) för registrering och inloggning. Detta har skapats med hjälp av JWT.

Adnvändarnamnet måste vara unikt för att registreras i databasen (MongoDB) och lösenordet blir hashad med bcrypt.

För att registrera:
POST "/api/register"
Det tar emot ett username och password i form av strängar.

För att logga in:
POST "/api/login"
Tar också emot username och password exakt i den form som de registrerades som.