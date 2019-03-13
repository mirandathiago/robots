const robots = {
    textInput: require('./robots/text-input'),
    text: require('./robots/text')
}

async function start(){
    content = {}
    robots.textInput(content)
    await robots.text(content)

   

    console.log(content)

}

start()