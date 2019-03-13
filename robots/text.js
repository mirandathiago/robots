const algorithmia = require('algorithmia');
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content){
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)

    async function fetchContentFromWikipedia(content){

        const algorithmiaAuth = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuth.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponse.get()

        content.sourceContentOriginal = wikipediaContent.content

       // console.log(wikipediaContent);
        console.log(`Termo de Busca: ${content.searchTerm}`);
    }

    function sanitizeContent(content){

        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)

        content.sourceContentSanitized = withoutDatesInParentheses
        breakContentIntoSentences(content)
        
        function removeBlankLinesAndMarkdown(text){
            const allLines = text.split("\n")

            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith('=')){
                    return false
                }else{
                    return true
                }
                    
            })

           return withoutBlankLinesAndMarkdown.join(' ')

        }

        function removeDatesInParentheses(text){

            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')

        }


        function breakContentIntoSentences(content){
            content.sentences = []
            
            const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
            sentences.forEach((sentence) => {
                content.sentences.push({
                    text: sentence,
                    keywords:[],
                    images:[]   
                })
            })


        }


    }


    
}

module.exports = robot;