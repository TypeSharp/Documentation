// get typesharp
class TypeSharpFunction {
     constructor(name, paramaters, code, jsEquivelant) {
          this.name = name;
          this.paramaters = paramaters;
          this.code = code;
          this.evaluator = eval(jsEquivelant);
     }

     call(...any) {
          return this.evaluator(...any);
     }
}
class TypeSharp {
     standardLibrary = [
          new TypeSharpFunction(
               'Future',
               [],
               null,
               Promise
          ),
          new TypeSharpFunction(
               'JSON',
               [],
               null,
               JSON
          ),
          new TypeSharpKeyWord(
               'namespace',
               (st) => {
                    if (st.includes('namespace')) {
                         // positive search ahead
                         const index = st.indexOf('namespace');
                         st = st.split('').slice(index, 2).join('');
                    }
               }
          )
     ]

     eval(code) {
          // todo
     }
}