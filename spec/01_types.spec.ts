import { stringify } from "querystring";

describe ('types in Typescript', () => {

    describe ('declaring variables and consts', () => {
        it ('explicitly typed local variables', () =>{
            let x : number | string; //uniontype
            x = 'Tacos';
            expect(typeof(x)).toBe('string');
            x = 3.14;
            expect(typeof(x)).toBe('number');
        });

        it('implicitly typed variables', () => {
            let x = 3.14;
            let y  = 'Brown';
           
            let z: number | string = 32;
            z= 'Pizza';

            interface Movie{
                title: string;
                director:string;
                yearReleased: number;
            };

            let movie: Movie= {
                title: 'Knives Out', 
                director: 'Johnson', 
                yearReleased: 2019
            };
            let movie2 : Movie = {
                title: 'Thor Ragnorak', 
                director: 'Taika Waititi', 
                yearReleased: 2017
            }

            expect(movie.title).toBe('Knives Out');
        });

        it('constants', () => {
            const name = 'Joe';
            //const has to be initialized and cannot be reassigned
            const task = {
                description : 'Clean Garage', 
                completed: false
            }
            task.completed = true; //objects are mutable in JS

            const friends = ['Billy', 'Sean', 'Zac', 'Amy'];
            friends[2] = 'Emma';
            expect(friends).toEqual(['Billy', 'Sean', 'Emma', 'Amy']);
            //could also use ToBe but to check deep equality (objects or arrays) use toEqual
        });

    });

    describe('literals', () => {
        it('has string literals', () => {
            expect('tacos').toEqual("tacos");

            const quote = "She said 'It isn't over yet!'";
            const name = "Flannery O'Connel";

            const quoteyquotes = 'She said "it isn\'t over yet!"';

            const someEscapeStuff = 'The story is this: \n\nIt was a dark and stormy night\n\n\t\tTHE END';
            console.log(someEscapeStuff);
        });
        it('literal strings(interpolated strings)', () => {
            expect('tacos').toEqual(`tacos`); //can also do backticks for string
            const fragment = `<div>
            <h1>Hello</h1>
            </div>`;
            console.log(fragment);

            const name = 'Bob';
            const age = 52;

            const message1 = 'The name is ' + name + ' and the age is '+ age;
            const message2 = `The name is ${name} and the age is ${age}`; //use backticks for this
            expect(message1).toEqual(message2);

        });
        it('numbers', () => {
            //watch out for floating point numbers
            const n1 = 1;
            const n2 = 1.3;
            const nHex = 0xFF;//base 16
            let nOct = 0o22; // base 8
            let nBin = 0b010101; //binary base 2
            let nBigNumber = 123_848_293_909.56;
        });
        it('booleans', () => {
            const isTrue = true;
            const isFalse = false;
            //any value can be implicitly converted to a boolean

            const name = 'Bob';

            let nameExists = null;

            if(name){
                nameExists = 'Yep';
            }
            expect(nameExists).toBe('Yep');

            expect("bob").toBeTruthy();
            expect("sue").toBeTruthy();
            expect('').toBeFalsy();
            expect(undefined).toBeFalsy();
            expect(NaN).toBeFalsy();
            expect(10).toBeTruthy();            
            expect(0).toBeFalsy();           
             expect(true).toBeTruthy();           
              expect(false).toBeFalsy();


        });
    });
    describe('array literals', () => {
        it('implicitly typed arrays', () => {
            const friends = ['Bill', 'Amy', 'Zac'];
            friends[0] = 'THX1138';

            let luckyNumbers : number[];
            luckyNumbers = [1, 9, 20 , 108];
            //either sytntax works
            let otherLuckyNumbers: Array<number>;
            otherLuckyNumbers = [1, 12, 18];
            //union arrays
            let varied : (string | number)[];
            varied = [1, 'dog', 12, 'cat'];

            let varied2 : Array<string|number>;
            varied2 = [13, 'Beetle', 'Tacos', 99];

            const third = varied2[2];
        
        });

        it('array destructuring', () =>{
            const films = ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'];

            const f1 = films[0];
            const f2 = films[2];

            expect(f1).toBe('A New Hope'); 
            expect(f2).toBe('Return of the Jedi');
            //could also write these lines as
            const[ff1, , ff2] = films;

            expect(ff1).toBe('A New Hope'); 
            expect(ff2).toBe('Return of the Jedi');


            const stuffToDo = ['Clean Garage', 'Pull Weeds', 'Fix Spouting'];

            const [first] = stuffToDo;
            expect(first).toBe('Clean Garage');
        }); 

        describe('typed arrays (known as tuples)', () => {
            it('a practical example - not using a typed array', () =>{
                
                interface FormattedName{
                    fullName: string, 
                    numberOfLetters: number

                }
                
                function formatName(first: string, last:string) : FormattedName {
                    const fullName = `${last}, ${first}`;
                    const numberOfLetters = fullName.length;
                    return {
                        fullName, 
                        numberOfLetters
                    }
                }
                const result: FormattedName = formatName('Han', 'Solo');
                expect (result.fullName).toBe('Solo, Han');
                expect(result.numberOfLetters).toBe(9);

                //object restructuring
                const {fullName, numberOfLetters} = formatName('Luke', 'Skywalker');

                expect(fullName).toBe('Skywalker, Luke');
                expect(numberOfLetters).toBe(15);

                const {fullName: longName} = formatName('Lando', 'Calrissian'); 
                expect(longName).toBe('Calrissian, Lando');

                
            });

            it('the same thing as a typed array', () =>{
                function formatName(first:string, last:string): [string, number]{//tuple
                    const fullName = `${last}, ${first}`;
                    return [fullName, fullName.length];
                }
                const response = formatName('Han', 'Solo');
                expect(response[0]).toBe('Solo, Han');
                expect(response[1]).toBe(9);

                const [name, letters] = formatName('Luke', 'Skywalker'); 
                expect(name).toBe('Skywalker, Luke'); 
                expect(letters).toBe(15); 
            });

            it('just another example', () =>{
                type ArtistTuple = [string, string, string, number];
                
                let artist: ArtistTuple;
                artist = ['Warren', 'Ellis', 'Musician', 60];

                const artistTow:ArtistTuple = ['Nick', 'Cave', 'Singer', 62];
                type ThingWithLettersAndStuff = string; //ThingWithLettersAndStuff is now an alias for the type string

                let name:ThingWithLettersAndStuff; //hover over and it's a string

                //can name tuples as well

                name = 'Joe';
                name = 'Sue';

                type Birthdate = string | null;

                interface Person {
                    name: string;
                    birthdate: Birthdate
                }
            });
        });
        it('modifying an array in a non-destructive way', () =>
        {
            const friends = ['Amy', 'Bill', 'David']; 
            const friends2 = ['Sarah', ...friends, 'Zac']; //...here is the 'Spread' operator- spreads out the array friends
            expect(friends2).toEqual(['Sarah', 'Amy', 'Bill', 'David', 'Zac']);
        }
        );
    });
    describe('object literals', ()=> {
        it('have an implicit type', () => {
            const book = {
                title: 'Reality', 
                author: 'Kingsley', 
                publisher: 'Random House', 
                year: 2008
            };
        });
        it('explicit object literals with an interface', () =>{
            interface Book{
                title:string;
                author: string;
                publisher: string;
                year:number
                subtitle?:string;//might have a subtitle, ? makes it optional
            };
            const reality: Book = {
                title: 'Reality', 
                author: 'Kingsley', 
                publisher: 'Random House', 
                year: 2008
        };
        const hw: Book ={
            title: 'High Weirdness', 
            author: 'Erik Davis', 
            publisher: 'OUP', 
            year: 2017, 
            //can't now add somethign that's not in the interface itself
        }
    
    });
    it('expando objects', () => {
        interface Book{
            title:string;
            author: string;
            publisher: string;
            year:number
            subtitle?:string;//might have a subtitle, ? makes it optional
            [key: string]: any
        };

        const realist: Book = {
            title: "harry potter", 
            author: "J.K. Rowling", 
            publisher: "unknown", 
            year: 1234, 
            subtitle: "The wizard who doesn't follow directions",
            genre:  'Philosophy', 
            reviews: ['Interesting, Boring'] 


        }

        interface Vehicle {
                vin: string;
                make: string;
                model: string;
        }

        interface Vehicles {
            [vin: string] : Vehicle
        }

        const vehicles: Vehicles = {
            '928398298' : {vin: '928398298',  make: 'Honda', model: 'Pilot' }, 
            'J3779739' : {vin:'J3779739', make: 'Chevy', model: 'Bolt' }
        }

        expect(vehicles['J3779739'].model).toBe('Bolt');

        interface Dictionary<T> {
            [key: string] : T
        }

        const library: Dictionary<Book> = {
            'Reality' : realist,
            'High Weirdness': {title: 'High Wierdness', author: 'Davis', publisher: 'MIT', year: 2018}
        }

        expect(library['High Weirdness'].author).toBe('Davis');
    });

    it('structural typing - a.k.a duck typing', () =>{
        function logMessage (message: {body: string}){//message is an object wiht a body property that is a string
            console.log(`At ${new Date().toISOString()} you got the following message: ${message.body}`);
        }
        logMessage({body: 'TACOS!!'});

        const phoneCall = {
            from: 'Mom', 
            body: 'Call me, you slacker!'
        }
        logMessage(phoneCall);
    });
//CHECK FOR HIS CODE HERE ??
///////

describe('function literals', () => {
    it('three different ways to declare them.', () => {
        //named function
        function add(a:number, b:number): number{
            return a+ b;
        }

        //anonymous functions have to be declared before they are used
        const subtract = (a: number, b: number): number => a-b;
        
        const multiply = function (a: number, b: number): number {
            return a * b;
        }

        expect(add(10,2)).toBe(12);
        expect(subtract(10, 2)).toBe(8);
        expect(multiply(3,3)).toBe(9);
        expect(((a:number, b:number) => a/b)(10,2)).toBe(5); //this is js tricks

    
    });

    it('a couple quick details about the syntax for arrow functions', () => {
        type MathOp = (a:number, b:number) => number;

        const add:MathOp = (a,b) => a + b;

        const division:MathOp = (a, b) => {
            if(b === 0){
                throw new Error('Are you trying to open a black hole?!');
            }
            else{
                return a/b;
            }
            }
            type Identity=(a: number) => number;

            const mockingBird:Identity = (a) =>a;//don't technically need those parens
        
        });
    });
})
});

