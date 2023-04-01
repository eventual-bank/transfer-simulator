import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: "us-east-1" });

const NUMBER_OF_ACCOUNTS = 10
const MAX_TRANSFER = 100

function getRandom () {
  return Math.random();
}

function pickValue (ceiling) {
  const r = Math.round(getRandom() * ceiling);
  return r;
}

function buildTransfer() {
  const from = pickValue(NUMBER_OF_ACCOUNTS);
  const to = pickValue(NUMBER_OF_ACCOUNTS);
  const amount = pickValue(MAX_TRANSFER)

  const transfer = {
    from: from,
    to: to,
    amount: amount
  }

  return transfer
}


export const handler = async (event) => {
  let response;

  const message =  buildTransfer()

  const params = {
    DelaySeconds: 10,
    MessageBody: JSON.stringify(message),
    QueueUrl: "https://sqs.us-east-1.amazonaws.com/709238829564/transfer"
  };


  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    if (data) {
      console.log("Success, message sent. MessageID:", data.MessageId);
      const bodyMessage = 'Message Send to SQS- Here is MessageId: ' + data.MessageId;
      response = {
        statusCode: 200,
        body: JSON.stringify(bodyMessage),
      };
    } else {
      response = {
        statusCode: 500,
        body: JSON.stringify('Some error occured !!')
      };
    }
    return response;
  }
  catch (err) {
    console.log("Error", err);
  }

};