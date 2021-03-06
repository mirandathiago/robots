const readLine = require('readline-sync');

function robot(content){

    content.searchTerm = askAndReturnSearchTerm()
    content.prefix = askAndReturnPrefix()

    function askAndReturnSearchTerm(){
        return readLine.question('Type a Wikipedia search term: ')
    }
    function askAndReturnPrefix(){
        const prefixes = ['Who is','What is','The history of']
        const selectedPrefixIndex = readLine.keyInSelect(prefixes,'Choose one Option');
        
        return prefixes[selectedPrefixIndex]
    
    }


}

module.exports = robot