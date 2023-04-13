import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: "us-east-1" });

const NUMBER_OF_ACCOUNTS = 10
const MAX_TRANSFER = 100

function getRandom () {
  return Math.random();
}

function pickValue (ceiling) {
  // account numbers start at 1
  const r = Math.ceil(getRandom() * ceiling);
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


  const transfers = process.env.NUMBER_OF_TRANSFERS;

  console.log ("Number of transfers: ", transfers);

  try {
    for (let i = 0; i < transfers; i++) {
    const message =  buildTransfer();

    const params = {
      DelaySeconds: 10,
      MessageBody: JSON.stringify(message),
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/709238829564/account_transfer"
    };

    const data = await sqsClient.send(new SendMessageCommand(params));
  }
  }
  catch (err) {
    console.log("Error", err);
  }

  const bodyMessage = 'Messages sent to SQS';
  const response = {
    statusCode: 200,
    body: JSON.stringify(bodyMessage),
  };
  return response;
};