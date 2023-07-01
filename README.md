# APP

    GymPass style app

## RFs(Requesitos funcionais)

    -[] Deve ser posivel se cadastrar
    -[] Deve ser posivel se autenticar
    -[] Deve ser posivel obter o perfil de um usuario logado
    -[] Deve ser posivel obter o numero de check-ins realizados pelo usuario logado
    -[] Deve ser posivel o usuario obter o seu hisotrico de check-ins
    -[] Deve ser posivel o usuario buscar academias proximas
    -[] Deve ser posivel o usuario buscar academias pelo nome
    -[] Deve ser posivel o usuario realizar check-in em uma academia
    -[] Deve ser posivel validar o check-in de um usuario
    -[] Deve ser posivel cadastrar uma academia

## RNs(Regras de negócio)
  
  -[] O usuario nao deve poder se cadastrar com um email duplicado
  -[] O usuario nao pode fazer 2 check-ins no mesmo dia 
  -[] O usario não pode fazer check=in se não tiver perto (100m) da academia
  -[] O check-in so pode ser validado ate 20min apos criado
  -[] o check-in so pode ser validado por administradores
  -[] a academia so pode ser cadastrada por administradores

## RNFs(Requesitos não funcionais)

  -[] a senha do usuario precisa estar criptografada
  -[] Os dados da aplicação precisam estar persistido em um banco Postgres
  -[] todas as listas de dados precisam estar paginadas com 20 itens por pagina
  -[] o usario deve ser identificado por um JWT(Json Web Token)