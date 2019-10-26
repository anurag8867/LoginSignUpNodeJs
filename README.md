# balancedParenthesisOperationAPI

Api's exposed:

        
        GET -> 
                1. getUsers -> http://localhost:8000/getUsers
            
        DELETE ->
                1. deleteUsers -> http://localhost:8000/deleteUsers\
                
        POST ->
                     1. SignUp -> http://localhost:8000/signUp
                        Body ->   {
                                    "email": "sindhuanurag2@gmail.com",
                                    "password": "hello123",
                                    "DOB": "1996-08-25",
                                    "username": "anurag",
                                    "role": "dev"
                                  }
                     2. Login -> http://localhost:8000/login
                         Body -> {"password":"hello123", "email":"sindhuanurag2@gmail.com"}   
                     3. Balanced -> http://localhost:8000/balanced
                         Body -> {
                                   "paranthesis": "[]"
                                 }
