Lambda to parse logs from cloudwatch streaming logs from openVPN and push to ES.


# init

```bash
npm install
```

# Config

| Var | Mean| Default|
|---|---|---|
|ES_ENDPOINT| required URL of ES host| ''|
|PREFIX| prefix to index where to push logs| 'abg-openVPN'|

# permissions

lambda policy:

```js
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:*:*:*"
            ]
        }
    ]
}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:*:*:*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": "es:ESHttpPost",
            "Resource": "*"
        }
    ]
}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole"
            ],
            "Resource": [
                "arn:aws:iam::658706153054:role/role-lambda-elasticsearch-archive"
            ]
        }
    ]
}

```

elasticsearch node policy:

```js

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::379722418906:role/lambda_elasticsearch_execution"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:us-east-1:658706153054:domain/abg-security-logging-domain/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::658706153054:role/lambda_elasticsearch_execution"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:us-east-1:658706153054:domain/abg-security-logging-domain/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::286694495060:role/lambda_elasticsearch_execution"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:us-east-1:658706153054:domain/abg-security-logging-domain/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::375751217453:role/lambda_elasticsearch_execution"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:us-east-1:658706153054:domain/abg-security-logging-domain/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:us-east-1:658706153054:domain/abg-security-logging-domain/*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": [
            "200.76.215.224",
            "187.200.22.164",
            "201.149.2.186",
            "189.251.199.34",
            "189.251.209.88",
            "187.190.26.235"
          ]
        }
      }
    }
  ]
}

```