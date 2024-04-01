#!/bin/bash

npm run dev &
  
npx sequelize-cli db:create &
  
wait -n
  
exit $?