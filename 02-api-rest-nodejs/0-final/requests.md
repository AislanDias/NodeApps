curl --request POST \
  --url http://localhost:3333/transactions \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "Freelancer",
	"amount": 8000,
	"type": "credit"
}'

curl --request GET \
  --url http://localhost:3333/transactions \
  --header 'User-Agent: insomnium/0.2.3-a' \
  --cookie sessionId=cacd56c8-6741-4023-afa7-bab488e546db

curl --request GET \
  --url http://localhost:3333/transactions/summary \
  --header 'User-Agent: insomnium/0.2.3-a' \
  --cookie sessionId=cacd56c8-6741-4023-afa7-bab488e546db