#! /bin/bash

QUERY='
mutation ReportGithubPwaStatus($input: ReportGithubPwaStatusInput!) {
  reportGithubPwaStatus(input: $input)
}
'

curl -v -X POST $DRAFTBIT_API_URL/graphql \
  -H 'Content-Type: application/json; charset=utf-8' \
  --data @- << EOF
{
  "operationName": "ReportGithubPwaStatus",
  "query": "$QUERY",
  "variables": {
    "input": {
      "publicationUuid": "$REPORT_TARGET_UUID",
      "action": "$REPORT_ACTION",
      "token": "$PUBLICATION_WEBHOOK_SECRET"
    }
  }
}
EOF

REPORT_BUILD_LOGS_BEARER="Bearer draftbit-is-greatest-ever"
lastLogs=$(tail -n 50 build.log | jq -Rs .)
curl -v -X POST "${DRAFTBIT_API_URL}/report-build-logs" \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H "Authorization: ${REPORT_BUILD_LOGS_BEARER}" \
  --data @- << EOF
{
  "platform": "Pwa",
  "publicationUuid": "${REPORT_TARGET_UUID}",
  "logs": ${lastLogs}
}
EOF
