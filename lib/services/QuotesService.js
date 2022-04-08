const fetch = require('cross-fetch');

module.exports = class QuotesService {
  static getQuotes() {

    const programmingQuoteMunged = fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
      .then((programmingQuoteResp) => programmingQuoteResp.json())
      .then((programmingQuote) => 
        ({
          author: programmingQuote.author,
          content: programmingQuote.en
        })
      );

    // const programmingQuote = await programmingQuoteResp.json();

    // const programmingMunged = 
    //   {
    //     author: programmingQuote.author,
    //     content: programmingQuote.en
    //   };

    const futuramaQuoteMunged = fetch('https://futuramaapi.herokuapp.com/api/quotes/1')
      .then((futuramaQuoteResp) => futuramaQuoteResp.json())
      .then((futuramaQuote) => 
        ({
          author: futuramaQuote[0].character,
          content: futuramaQuote[0].quote
        })
      )

    // const futuramaQuote = futuramaQuoteResp.json();

    // const futuramaMunged = 
    //   {
    //     author: futuramaQuote[0].character,
    //     content: futuramaQuote[0].quote
    //   };

    const randomQuote = fetch('https://api.quotable.io/random')
      .then((randomQuoteResp) => randomQuoteResp.json());

    // const randomQuote = randomQuoteResp.json();

    // const randomMunged = 
    //   {
    //     author: randomQuote.author,
    //     content: randomQuote.content
    //   };

    // console.log('programmingQuote', programmingQuote);
    // console.log('futuramaQuote', futuramaQuote);
    // console.log('randomQuote', randomQuote);

    // console.log('programmingMunged', programmingMunged);
    // console.log('futuramaMunged', futuramaMunged);
    // console.log('randomMunged', randomMunged);

    // const quotes = [programmingMunged, futuramaMunged, randomMunged];

    Promise.allSettled([
      programmingQuoteMunged, 
      futuramaQuoteMunged, 
      randomQuote
    ])
      .then((responses) => console.log('RESPONSES', responses));

    // return quotes;
      
  }
};
