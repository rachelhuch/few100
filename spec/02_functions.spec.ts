describe('functions', () => {

    it('overloading (spoiler: you cannot do it)', () => {

        function formatName(first: string, last: string, mi?: string): string {
            let fullName = `${last}, ${first}`;
            if (mi) { // mi !== null || mi !=== undefined || mi !== ""
                fullName += ` ${mi}.`;
            }
            return fullName;
        }



        expect(formatName('Han', 'Solo')).toBe('Solo, Han');
        expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');

    });

    it('default values for parameters', () => {

        function add(a: number = 2, b: number = 10): number {
            return a + b;
        }
        expect(add()).toBe(12);
        expect(add(undefined, undefined)).toBe(12);
        expect(add(10)).toBe(20);
        expect(add(3, 5)).toBe(8);
        expect(add(undefined, 8)).toBe(10);
    });
    it('rest operator', () => {
        function add(a: number, b: number, ...rest: number[]) {
            const firstTwo = a + b;
            return rest.reduce((s, n) => s + n, firstTwo);
        }

        expect(add(2, 2)).toBe(4);
        expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
    });
    describe('higher-ordered functions', () => {
        it('an imperative tagMaker', () => {


            // <element>content</element>
            function tagMaker(element: string, content: string) {
                return `<${element}>${content}</${element}>`;
            }

            expect(tagMaker('name', 'Bob Smith')).toBe('<name>Bob Smith</name>');
            expect(tagMaker('pay', '$4,231.52')).toBe('<pay>$4,231.52</pay>');
            expect(tagMaker('pay', '$500')).toBe('<pay>$500</pay>');
            expect(tagMaker('pay', '$4')).toBe('<pay>$4</pay>');

        });

        it('an object oriented approach', () => {

            class TagMaker {
                // private element:string;

                // constructor(element: string) {
                //     this.element = element;
                // }

                constructor(private element: string) { }

                make(content: string) {
                    return `<${this.element}>${content}</${this.element}>`;
                }
            }

            const nameMaker = new TagMaker('name');
            const payMaker = new TagMaker('pay');

            expect(nameMaker.make('Bob Smith')).toBe('<name>Bob Smith</name>');
            expect(nameMaker.make('Dale Cooper')).toBe('<name>Dale Cooper</name>');
            expect(payMaker.make('$23.00')).toBe('<pay>$23.00</pay>');


        });

        it('a functional approach', () => {
            function tagMaker(element: string): (content: string) => string {
                return function (content: string) {
                    return `<${element}>${content}</${element}>`;
                }
            }

            const nameMaker = tagMaker('name');
            const payMaker = tagMaker('pay');

            expect(nameMaker('Leland')).toBe('<name>Leland</name>');
            expect(nameMaker('Harry S. Truman')).toBe('<name>Harry S. Truman</name>');
            expect(payMaker('$32.52')).toBe('<pay>$32.52</pay>');
        });

        it('a function that takes a function', theFunctionalStuff);
    });

});

describe('array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it('visiting each element of an array', () => {
        // foreach(var x in numbers) {....}

        numbers.forEach((e) => {
            console.log('Got', { e });
        });

        numbers.forEach((v, i, a) => console.log({ v, i, a }));
    });
    describe('array methods that return a new array', () => {

        it('has filter', () => {
            // in C# this is sort of like LINQ's 'where' method
            const evens = numbers.filter(n => n % 2 === 0);

            expect(evens).toEqual([2, 4, 6, 8]);
            expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it('has map', () => {
            //if there is a place you want to go...the map
            const asStrings = numbers.map(n => n.toString());
            expect(asStrings).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

            const doubled = numbers.map( n => n * 2);
            expect(doubled).toEqual([2,4,6,8,10,12,14,16,18]);
        });

    });

    describe('that return a single (scalar) value', () => {
         it('checking the membership of an array against a predicate', () =>{
        
        //c# LiNq Any
            const allEven = numbers.every (n => n% 2 ===0);//every checks every element of the array against predicate and if they all return true then it has ture

         expect(allEven).toBe(false);

         //c# ling all
         const someEven = numbers.some( n=> n% 2 ===0);
         expect(someEven).toBe(true);


         });
    })
});


function theFunctionalStuff() {
    function formatName(first: string, last: string, decorator: (n: string) => string = (n) => n) {
        return decorator(`${last}, ${first}`);
    }

    const r1 = formatName('Han', 'Solo');
    expect(r1).toBe('Solo, Han');

    const r2 = formatName('Han', 'Solo', padForCheck);
    expect(r2).toBe('***Solo, Han***');

    const r3 = formatName('Han', 'Solo', x => x.toUpperCase());
    expect(r3).toBe('SOLO, HAN');


    function padForCheck(name: string): string {
        return '***' + name + '***';
    }
}

 //value index array

            //**learn these array methods, become basis of your angular work */
            //angular is about user interface
      //they dont change the original array

