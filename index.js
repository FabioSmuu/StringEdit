//scroll cima \x1b[${rows}S
//scroll baixo \x1b[${rows}T
const [ maxColumns, maxRows ] = process.stdout.getWindowSize ? process.stdout.getWindowSize() : [0, 0]

const hexToRGB = hex => {
	try {
		const [_, r1 = 0, r2 = 0, g1 = 0, g2 = 0, b1 = 0, b2 = 0] = [...hex]
		
		return {
			red: parseInt(`${r1}${r2}`, 16),
			green: parseInt(`${g1}${g2}`, 16),
			blue: parseInt(`${b1}${b2}`, 16)
		}
	}
	catch(e) {
		return {
			red: 0,
			green: 0,
			blue: 0
		}
	}
}

const terminal = {
	row: 1,
	column: 1,
	scroll: {
		up(rows) {
			process.stdout.write('\x1b[${rows}S')
			return rows
		},

		down(rows) {
			process.stdout.write('\x1b[${rows}T')
			return rows
		},
	},
	colors: {
		reset: '\x1b[0m', //Retorna a fonte padrão
		reverse: '\x1b[7m', //Troca a cor da letra com a cor do fundo

		fgColor(hex) {
			const { red, green, blue } = hexToRGB(hex)
			return `\x1b[38;2;${red};${green};${blue}m`
		},

		bgColor(hex) {
			const { red, green, blue } = hexToRGB(hex)
			return `\x1b[48;2;${red};${green};${blue}m`
		}/*,

		backgroundColor(hex) {
			const { row, column } = position.get()
			log(this.bgColor(hex) + (' '.repeat(maxColumns * maxRows)))
			position.set(row, column)
		}*/
	},

	cursor: {
		isHide: false,

		show() {
			process.stdout.write('\x1b[?25h')
			return this.isHide = false
		},

		hide() {
			process.stdout.write('\x1b[?25l')
			return this.isHide = true
		}
	}
}

//Corrigir caracteres
process.stdin.setEncoding('utf8')

const input = async (keypress = false) => {
	process.stdin.setRawMode(!!keypress)
	const stdin = process.stdin.resume()

	const readable = resolve => input => {		
		stdin.pause()
		if (input) resolve(input.trim())
	}

	return new Promise(resolve => stdin.on('data', readable(resolve)))
}

const sleep = milliseconds => {
	const startTime = new Date().getTime()
	while ((new Date().getTime() - startTime) < milliseconds) {}
	return {
		startTime,
		endTime: new Date().getTime()
	}
}

const position = {
	get() {
		return {
			row: terminal.row,
			column: terminal.column
		}
	},

	getRow() {
		return terminal.row
	},

	getColumn() {
		return terminal.column
	},

	set(row, column) {
		if (row < 1) row = 1
		if (column < 1) column = 1

		terminal.row = row
		terminal.column = column

		process.stdout.write(`\x1b[${row};${column}H`)
		return { row, column }
	},

	setRow(row) {
		return this.set(row, terminal.column)
	},

	setColumn(column) {
		return this.set(terminal.row, column)
	}
}

const instance = (settings = {}) => {
	const  { row: r, column: c } = position.get()
	const {
		row = r,
		column = 1,
		newline = false,
		lastColumn = false,
		clearRow = false,
		underline = false,
		color = {}
	} = settings

	const newRow = newline ? row +1 : row
	const newColumn = lastColumn ? c : column
	position.set(newRow, newColumn)

	const { colors: { reverse, reset, fgColor, bgColor } } = terminal
	const reverseColor = color.reverse ? reverse : ''
	const font = color.font ? fgColor(color.font) : ''
	const background = color.background ? bgColor(color.background) : ''
	const clear = clearRow ? `\x1b[1M\x1b[${newRow};${newColumn}H` : ''

	const fontline = underline ? `\x1b[4m` : ''

	const formatString = `${clear}${reverseColor}${background}${font}${fontline}`

	settings.row = row
	settings.column = column
	settings.newline = newline
	settings.lastColumn = lastColumn
	settings.clearRow = clearRow
	settings.underline = underline
	settings.color = color

	return [ settings, formatString ]
}

const clear = () => {
	position.set(0, 0)
	try {
		console.clear()
		return true
	}
	catch(e) {
		process.stdout.write('\x1b[2J')
		return false
	}
}

const log = (string, settings = {}) => {
	if (
		typeof string !== 'string'
		&& typeof string !== 'number'
		&& typeof string !== 'boolean'
	) return console.log(string)

	const [ setting, result ] = instance(settings)
	const strings = string.toString().split(/\n/g)
	strings.forEach((str, index) => {
		if (index == 0) return  process.stdout.write(`${result}${str}${terminal.colors.reset}`)

		position.set(setting.row+index+1, setting.column)
		//process.stdout.write(`\x1b[${setting.row+1}L`)
		process.stdout.write(`${result}${str}${terminal.colors.reset}`)
	})

	return {
		string,
		...setting
	}
}

const panel = (width, height, settings = {}) => {
	delete settings.clearRow
	delete settings.lastColumn

	const [ setting, result ] = instance(settings)
	const {
		map = [
			'┌', '─', '┐',
			'│', '·', '│',
			'└', '─', '┘'
		],

	} = settings

	const [
		top_left, top, top_right,
		left, center, right,
		bottom_left, botom, bottom_right
	] = map || []

	const tempSettings = {...setting}
	const context = []

	const lineTop = `${top_left}${top.repeat(width - top_left.length - top_right.length).substr(0, width - top_left.length - top_right.length)}${top_right}`
	const lineCenter = `${left}${center.repeat(width - left.length - right.length).substr(0, width - left.length - right.length)}${right}\n`.repeat(height-2)
	const lineBottom = `${bottom_left}${botom.repeat(width - bottom_left.length - bottom_right.length).substr(0, width - bottom_left.length - bottom_right.length)}${bottom_right}`

	context.push(lineTop, '\n', lineCenter, lineBottom)

	context.join('').split('\n').forEach((ctx, index) => {
		if (index == 0) return process.stdout.write(`${result}${ctx}${terminal.colors.reset}`)


		position.set(setting.row+index, setting.column)
		process.stdout.write(`${result}${ctx}${terminal.colors.reset}`)
	})

	position.set(tempSettings.row, setting.column)
	setting.map = map
	setting.row = tempSettings.row

	return {
		width,
		height,
		...setting
	}
}

const mask = (string, mask, replaceChar = 'X') => {
	let nextIndex = 0
	mask = [...(mask).toString()]

	const replaceThis = (char, index) => {
		if (char !== replaceChar) return nextIndex++
		mask[index] = [...string.toString()][index - nextIndex]
	}

	mask.map(replaceThis)
	return mask.join('')
}

const fnImportMask = (name = 'mask') => {
	const newMask = function(stringMask, replaceChar = 'X') {
		return mask(this, stringMask, replaceChar = 'X')
	}

	Object.setPrototypeOf(String.prototype, { mask: newMask })
	Object.setPrototypeOf(Number.prototype, { mask: newMask })	
}

const fnImportColors = () => {
	const fgColor = function(hex) {
		return terminal.colors.fgColor(hex) + this + terminal.colors.reset
	}

	const bgColor = function(hex) {
		return terminal.colors.bgColor(hex) + this + terminal.colors.reset
	}

	Object.setPrototypeOf(String.prototype, { fgColor, bgColor })
}

module.exports = (settings = {}) => {
	const {
		importMask = true,
		importColors = true
	} = settings

	if (importMask) fnImportMask()
	if (importColors) fnImportColors()

	return {
		maxRows,
		maxColumns,
		...terminal.colors,
		sleep,
		position,
		input,
		clear,
		mask,
		cursor: terminal.cursor,
		log,
		panel,
		scroll: terminal.scroll
	}
}