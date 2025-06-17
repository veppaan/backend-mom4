Vera Kippel veki2400

Detta moment är ett API som innehåller funktonalitet (POST) för registrering och inloggning. Detta har skapats med hjälp av JWT.

Användarnamnet måste vara unikt för att registreras i databasen (MongoDB) och lösenordet blir hashad med bcrypt.

För att registrera:
POST "/api/register"
Det tar emot ett username och password i form av strängar.

För att logga in:
POST "/api/login"
Tar också emot username och password exakt i den form som de registrerades som.

Skyddad sida:
GET "/api/protected"
Tar emot och kollar giltig token samt hämtar alla användarnamn som är registrerade