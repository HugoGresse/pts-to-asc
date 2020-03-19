const {program} = require('commander')
const fs = require('fs')
const es = require('event-stream')


const outputFile = "output.asc"

// Assume the .pts file is as below:
/*
 FID,POINTID,GRID_CODE,X,Y
 0,1,2.115983960000000,364625.196000000000000,3777036

 GRID_CODE is the "z"
 */
const processFile = (fileName) => {
    let lineNr = 0

    const outputStream = fs.createWriteStream(outputFile, {flags: 'w'})

    const stream = fs.createReadStream(fileName)
        .pipe(es.split())
        .pipe(es.mapSync((line) => {
                stream.pause()
                lineNr += 1

                if(lineNr === 1){
                    // Skip first line
                    stream.resume()
                    return
                }

                console.log("Line " + lineNr)

                write(outputStream, transform(line), () => {
                    stream.resume()
                })
            })
                .on('error', function (err) {
                    console.log('Error while reading file.', err)
                })
                .on('end', function () {
                    console.log('Read completed.')

                    outputStream.end()
                })
        )

    outputStream
        .on('error', function (err) {
        console.log(err)
    })
        .on('finish', function (err) {
            console.log("Write finished.")
            process.exit(1)
        })
}

function write(stream, data, cb) {
    if (!stream.write(data)) {
        stream.once('drain', cb)
    } else {
        process.nextTick(cb)
    }
}

const x = 3
const y = 4
const z = 2
function transform(input) {
    const splitted = input.split(',')
    if(splitted.length !== 5) {
        console.log("ERROR, some line are missing data")
        process.exit(1)
    }
    return `${splitted[x]} ${splitted[y]} ${splitted[z]} \n`
}

const main = async () => {
    program.parse(process.argv)

    console.log(program.opts())

    if (!program.file) {
        console.log("No file given")
        process.exit(1)
    }

    processFile(program.file)
}

program
    .option('-f, --file <pointFile>', 'the name of the points file')

main()
