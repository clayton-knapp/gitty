const fetch = require('cross-fetch');

module.exports = class QuotesService {
  static getQuotes() {

    const programmingQuoteMunged = 
    //fetch from api
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
    //then parse the response
      .then((programmingQuoteResp) => programmingQuoteResp.json())
    //then munge the parsed data into shape we want
      .then((programmingQuoteParsed) => 
        ({
          author: programmingQuoteParsed.author,
          content: programmingQuoteParsed.en
        })
      );

    const futuramaQuoteMunged = fetch('https://futuramaapi.herokuapp.com/api/quotes/1')
      .then((futuramaQuoteResp) => futuramaQuoteResp.json())
      .then((futuramaQuoteParsed) => 
        ({
          author: futuramaQuoteParsed[0].character,
          content: futuramaQuoteParsed[0].quote
        })
      );

    const randomQuoteMunged = fetch('https://api.quotable.io/random')
      .then((randomQuoteResp) => randomQuoteResp.json())
      .then((randomQuoteParsed) => 
        ({
          author: randomQuoteParsed.author,
          content: randomQuoteParsed.content
        })
      );

    //could us allSettled, would want to return response.value
    return Promise.all([
      programmingQuoteMunged, 
      futuramaQuoteMunged, 
      randomQuoteMunged,
    ])
      .then((responses) => {
        // console.log('RESPONSES', responses); 
        const quotes = responses.map((response) => response);
        // console.log('QUOTES', quotes);
        return quotes;
      }
      );
      
  }
};
