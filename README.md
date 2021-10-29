# StrEdit

Este projeto foi desenvolvido com o intuito de facilitar o uso de cores, posicionamento e formatação de string de forma leve e individual tratando pequenas da api do console.


> **AVISO:** Este modulo não funciona em consoles ficticiosos como vscode, sublimetext e outros, apenas em consoles nativos.

[![N|Solid](https://nodei.co/npm/stredit.png)](https://www.npmjs.com/package/stredit)
[![N|Solid](https://img.shields.io/npm/dt/stredit.svg)](https://www.npmjs.com/package/stredit) [![N|Solid](https://img.shields.io/npm/v/stredit.svg)](https://www.npmjs.com/package/stredit)

[![N|Solid](https://cdn.discordapp.com/attachments/631607183301148672/724397007170568313/paypal.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=fabinhoec2210@gmail.com&item_name=F%C3%A1bio&currency_code=BRL)  [![N|Solid](https://cdn.discordapp.com/attachments/631607183301148672/724397005543178270/picpay.png)](https://app.picpay.com/user/smuu)

#### Sobre:
> Manipule strings no console de forma prática!
- Mude a cor de fundo e da fonte sem alterar todo o console.
- Use cores hexadecimais, como as usadas em css, exemplo: #FF0000
- Manipule posicionamento e sobreposição de strings.
- Formate textos com uma nova estrutura mask, exemplo: XX/XX/XX
- Use o teclado como input para comandos ou ações.
- Crie e mapeie painéis pré-definidos.
- Manipule a scroll do console.


```diff
Update [1.0.8]:
+ Agora é possível escolher usar ou não as prototypes internas.
+ Corrigido a quebra de linhas de se.log.
+ Cursor do console agora pode ser exibido ou ocultado.
+ Estrutura de posicionamento do cursor, refeita.
+ Strings podem substituir uma linha inteira se desejado.
+ Foi adicionado mapeamento de cores RGB através de hexadecimal.
+ Toda a estrutura de strings foram refeitas.
+ Inputs do teclado são ouvidos de forma sync.
+ A scroll do console pode ser manipulada.

- Sobreposições e estruturas deprecarias foram removidas.
- Todas as promises foram removidas.
```

### Como usar:
O uso deste projeto é bem simples, pois, suas funções foram pensadas em iniciantes na área de desenvolvimento para nodejs.

```js
const se = require('stredit')()
```

Resumo:
```js
const se = require('stredit')({
	//importMask: true,
	//importColors: true
})


const exemplo = {
	row: 3,
	column: 17,
	clearRow: true,
	//lastColumn: true,
	underline: true,
	color: {
		font: '#0000ff',
		background: '#ff00ff',
		reverse: true
	}
}

se.log('Teste de texto')
se.log('Teste de texto2', {row: 3, lastColumn: true, underline: true})
se.log(`Eu sou o Smuu`, exemplo)
se.log(`Outro teste`, { row: 4, clearRow: true, color: { font: '#FF0000' } })
const demonstrar = se.log(`DeehLeh`, { newline: true, clearRow: true, color: { font: '#00FF00' } })
se.log('Fábio', {column: 19})

console.log(demonstrar)
```

Resultado:

![N|Solid](https://imgur.com/SoOaThh.png)



Manipulando cores em string:
```js
const se = require('stredit')({
	importColors: true //Esta opção ativa as prototype fgColor e bgColor.
})

se.position.set(2, 3)
console.log(
	'F'.fgColor('#FF0000') +
	'á'.fgColor('#00ff2d') +
	'b'.fgColor('#d2d2d2') +
	'i'.fgColor('f4FD1a') +
	'o'.fgColor('#FF00ff')
)
```
Resultado:

![N|Solid](https://i.imgur.com/ZB9eafo.png)



O primeiro Hello World:
```js
const se = require('stredit')({ importColors: true })

const exemplo = {
    row: 2,
    column: 5
}

se.log(' Hello '.fgColor('#000000').bgColor('#00ff22') + ' ' + 'World'.fgColor('#dd33ff'), exemplo)
```
Resultado:

![N|Solid](https://imgur.com/jJxFHvv.png)



Como imprimir um "Olá Mundo" customizado no console:
```js
const se = require('stredit')()

const exemplo = {
    row: 3,
    column: 5,
    color: {
    	font: '#FF00ff',
    	background: '#ffffff',
    	reverse: true
    }
}

se.log('Olá', exemplo)

exemplo.column += 4
se.log('mundo', exemplo)
```
Resultado:

![N|Solid](https://imgur.com/ahs966t.png)



Usando esta mesma estrutura, se torna possível a manipulação de linhas e colunas da seguinte forma:
```js
const se = require('stredit')()

const exemplo = {
	column: 5,
	row: 2
}

se.log('Exemplo', exemplo)

exemplo.row = 1
exemplo.column = 3

se.log('Fábio', exemplo)
```
Resultado:

![N|Solid](https://imgur.com/fVlcFhC.png)



Usando a propriedade de sobreposição(newline) de linhas:
```js
const se = require('stredit')()

const exemplo = {
	row: 3,
	column: 5,
    color: {
    	font: '#ffffff',
        background: '#fd0f0d'
    }
}

console.log('//newline: true')
se.log('aaa', exemplo)
se.log('bb', exemplo)
se.log('c', exemplo)
```
Resultado:

![N|Solid](https://imgur.com/MOajjW9.png)



Um dos fortes da StrEdit é exatamente mudar a formatação de uma string através do protótipo .mask como mostra este exemplo:

```js
const se = require('stredit')({
	importMask: true ////Esta opção ativa a prototype mask.
})

const exemplo = 1234567890
const resultado1 = exemplo.mask('**/**/**', '*')   //resultado: 12/34/56
const resultado2 = 'Exemplo'.mask('XXXX-X')    //resultado: Exem-p

console.log(resultado1)  //resultado: 12/34/56
console.log(resultado2)  //resultado: Exem-p
```


Outros exemplos usando .mask:
```js
const se = require('stredit')({ importMask: true })

const exemplo = 12345678
exemplo.mask('XXX-XXXX')		// resultado: 123-4567
'12345678'.mask('XX-XX-XX')		// resultado: 12-34-56
'12345678'.mask('XX/XX/XX')		// resultado: 12/34/56
'StrEdit'.mask('XX.XX.XX')		// resultado: St.rE.di
'Fabio Smuu'.mask('XX/XX/XX/XX/XX')	// resultado: Fa/bi/o /Sm/uu
```


### Criação de Paineis:

A criação do painel já esta pré programado, então basta usar:
```js
const se = require('stredit')()

const exemplo = se.panel(20, 10, {
	color: {
		font: '#0f00ff',
		background: '#00ffFF'
	}
})

exemplo.row += 1
exemplo.column += 1

se.log('Example', exemplo)

exemplo.row += exemplo.height-3
exemplo.column += 11

se.log('Example', exemplo)
```
Resultado:

![N|Solid](https://imgur.com/r9ztiuL.png)



Propriedades de um painel:
```js
se.panel(20, 5, {
	row: 3,
	column: 17,
	underline: true,
	color: {
		font: '#0000ff',
		background: '#ff00ff',
		reverse: true
	},
	map: [
		'┌', '─', '┐',
		'│', '·', '│',
		'└', '─', '┘'
	]
})
```



Para ver as informações de um painel não necessita mais de uma promise:
```js
const exemplo = se.panel(20, 5, {
	row: 3,
	column: 17,
	underline: true,
	color: {
		font: '#0000ff',
		background: '#ff00ff',
		reverse: true
	}
})

console.log(exemplo)
```

Uma demonstração de como customizar um Map de sua maneira:
```js
se.panel(21, 4, {
	map: [
		'┌//', '─X', '\\\\┐',
		'│X', ' # .', 'X│',
		'└\\\\', 'X─', '//┘',
	]
})
```
Resultado:

![N|Solid](https://imgur.com/etH2MXa.png)



### Outros exemplos:


Exemplo de uma animação básica:
```js
const se = require('stredit')()

const panel1 = se.panel(21, 3, {
	row: 3,
	column: 12,
	color: {
		font: '#dd021f'
	}
})

se.panel(21, 14, {
	row: panel1.height + 3,
	column: 12,
	color: {
		font: '#ff4010'
	}
})

se.log('##', { row: 4, column: 13 })
se.sleep(1000)
se.log('###', { column: 15 })
se.sleep(1000)
se.log('####', { column: 18 })
se.sleep(1000)
se.log('-', { column: 19 })
se.sleep(1000)
se.log('##', { column: 21 })
se.sleep(1000)
se.log('###', { column: 24 })
se.sleep(1000)
se.log('-#', { column: 28 })
se.sleep(1000)
se.log('Exemlo Ok !', { row: 7, column: 13 })
se.sleep(1000)
se.log('Exemlo Ok !', { newline: true, lastColumn: true })
se.sleep(1000)
se.log('Exemlo Ok !', { newline: true, lastColumn: true })
se.sleep(1000)
se.log('Exemlo Ok !', { newline: true, lastColumn: true })
se.sleep(1000)
se.log('Exemlo Ok !', { row: 18, lastColumn: true })
```
Resultado:

![N|Solid](https://imgur.com/hAVbcCM.gif)




Exemplo do uso de comandos e inputs do teclado:
```js
const se = require('stredit')()

const colorBase = '#40df23'
const commandExample = async () => {
	se.clear()

	se.log('Insira um nome: '.fgColor(colorBase))
	const name = await se.input()
	se.log(`${se.fgColor(colorBase)}Olá ${se.reset}${name}${se.fgColor(colorBase)}, defina uma senha: `)

	const pass1 = await se.input()
	se.log(`Perfeito, agora preciso que a confirme: `.fgColor(colorBase))

	const pass2 = await se.input()

	se.cursor.hide()

	if (pass1 !== pass2) {
		se.log(`As senhas não coincidem, aguarde 2 segundos que iremos recomeçar.`.fgColor('#ff2100'))
		se.sleep(2000)
		return commandExample()
	}

	se.log('Conectando...', { newline: true })
	se.sleep(2000)


	se.clear()
	se.log(`Bem-vindo(a) ${name}`.fgColor('#00fdff'))
	se.log('\nEscolha uma opção:\n- 1: Exemplo de input\n- 2: Exemplo de input\n- 3: Exemplo de input', { column: 3, newline: true })

	se.cursor.show()
	se.log('\n> ')
	const escolha = await se.input(true)

	console.log('Você escolheu ', escolha)
	console.log('Eu sabia que esta era a melhor opção!')
}
```
Resultado:

![N|Solid](https://imgur.com/tYyABEh.gif)


Exemplo de uso para a **StrEdit**: *(Uma homenagem ao famoso jogo Sanke)*
```js
const se = require('./se.js')({
	importMask: true,
	importColors: true
})

const events = require('events')
events.EventEmitter.defaultMaxListeners = 0
const game = new events()

let count = 0

const snake = {
	x: 1,
	y: 1,
	dx: 1,
	dy: 0,
	cells: [],
	maxCells: 4,
	press: false
}

const apple = {
	x: Math.floor(Math.random() * se.maxColumns)+1,
	y: Math.floor(Math.random() * se.maxRows)+1
}

game.on('keyIsDown', key => {
	if (key == 'a' && snake.dx === 0) {
		snake.dx = -1
		snake.dy = 0
	}
	else if (key == 'w' && snake.dy === 0) {
		snake.dy = -1
		snake.dx = 0
	}
	else if (key == 'd' && snake.dx === 0) {
		snake.dx = 1
		snake.dy = 0
	}
	else if (key == 's' && snake.dy === 0) {
		snake.dy = 1
		snake.dx = 0
	}
})

const keyboard = async () => {
	const key = await se.input(true)
	game.emit('keyIsDown', key)
}

const loop = async () => {
	if (!snake.press) {
		snake.press = await true
		const info = await keyboard()
		snake.press = await false
	}

	se.cursor.hide()
	se.clear()

	snake.x += snake.dx
	snake.y += snake.dy

	if (snake.x <= 0) snake.x = se.maxColumns
	else if (snake.x >= se.maxColumns+1) snake.x = 1
	if (snake.y <= 0) snake.y = se.maxRows
	else if (snake.y >= se.maxRows+1) snake.y = 1

	snake.cells.unshift({x: snake.x, y: snake.y})

	if (snake.cells.length > snake.maxCells) snake.cells.pop()

	se.log('■', {
		row: apple.y,
		column: apple.x,
		color: {
			font: '#e91e63'
		}
	})

	snake.cells.forEach((cell, index) => {
		se.log('█', {
			row: cell.y,
			column: cell.x,
			color: {
				font: '#79ec81'
			}
		})

		if (cell.x == apple.x && cell.y == apple.y) {
			apple.x = Math.floor(Math.random() * se.maxColumns)+1
			apple.y = Math.floor(Math.random() * se.maxRows)+1
			snake.maxCells++
		}

		for (let i = index + 1; i < snake.cells.length; i++) {
			if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
				snake.x = 1
				snake.y = 1
				snake.cells = []
				snake.maxCells = 4
				snake.dx = 1
				snake.dy = 0

				apple.x = Math.floor(Math.random() * se.maxColumns)+1
				apple.y = Math.floor(Math.random() * se.maxRows)+1
			}
		}
	})

	se.log((snake.maxCells-4), {
		row: se.maxRows-1,
		column: 2
	})
}
setInterval(loop, 100)
```
Resultado:

![N|Solid](https://imgur.com/6X8aZdH.gif)




### Metodos e prototypes:
|Ação|Descrição|Retorno|
|-|-|-|
|se.clear() | Limpa o console por completo | Boolean
|se.sleep(milliseconds) | Fazer o console esperar para efetuar código abaixo| Object
|se.log(string, settings) | Imprime um texto no console usando uma estrutura| Object
|se.panel(width, height, settings)|Efetua a criação de painéis no console| Object
|se.input(keypress)|Espera o input do teclado no console, true faz uma interação unica|Promise
|String\|Number.mask(mask, replacement)|Formata sobre "mascara" em um valor **Configure importMask: true**| String\|Number
|String.fgColor('#000000')|Muda a cor da fonte através de prototype **Configure importColors: true**|String
|String.bgColor('#ffffff')|Muda a cor de fundo através de prototype **Configure importColors: true**|String


| Scroll |Descrição|Retorno|
|-|-|-|
|se.scroll.up(rows)|Sobe a scroll na quantia de linhas exigida|Number
|se.scroll.down(rows)|Desce a scroll na quantia de linhas exigida|Number

| Cursor |Descrição|Retorno|
|-|-|-|
|se.cursor.isHide|Retorna o estado de visibilidade do cursor no console|Boolean
|se.cursor.show()|Força a exibição do cursor no console|Boolean
|se.cursor.hide()|Força a omissão do cursor no console|Boolean

| Position |Descrição|Retorno|
|-|-|-|
|se.maxRows|Retorna a Altura maxima visivel do console|Number
|se.maxColumns|Retorna a largura máxima visível do console|Number
|se.position.get()|Retorna o valor da linha e coluna atual|Object
|se.position.getRow()|Retorna o valor da linha atual|Number
|se.position.getColumn()|Retorna o valor da coluna atual|Number
|se.position.set(row, column)|Redefine o valor da linha e coluna atual|Object
|se.position.setRow(row)|Redefine o valor da linha atual|Number
|se.position.setColumn(column)|Redefine o valor da coluna atual|Number



### Propriedades de string:
> se.log(string, settings)

|Propriedade|Descrição|Tipo|
|-|-|-|
|row|Força a impressão da string nesta linha|Number
|column|Força a impressão da string nesta coluna|Number
|newline|Força a quebra de linha de acordo com a string anterior|Boolean
|lastColumn|Substitui **column** pela última column usada|Boolean
|clearRow|Rescreve a linha inteira apagando o conteúdo antigo|Boolean
|underline|Sublinha a string|Boolean
|color.font|Munda a cor da string usando cores em hexadecimal|String
|color.background|Muda a cor de fundo usando cores em hexadecimal|String
|color.reverse|Inverte as cores da fonte e fundo da string|Boolean


### Propriedades de panel:
> se.panel(width, height, settings)

|Propriedade|Descrição|Tipo|
|-|-|-|
|row|Força a impressão do painel nesta linha|Number
|column|Força a impressão do painel nesta coluna|Number
|newline|Força a quebra de linha de acordo com o painel anterior|Boolean
|*lastColumn|Ainda em dsenvolvimento|----------
|*clearRow|Ainda em dsenvolvimento|----------
|underline|Sublinha o painel|Boolean
|color.font|Munda a cor do painel usando cores em hexadecimal|String
|color.background|Muda a cor de fundo usando cores em hexadecimal|String
|color.reverse|Inverte as cores da fonte e fundo do painel|Boolean
|map|Muda as strings da borda usando uma estrutura|Array



**Obrigado pela sua atenção!**