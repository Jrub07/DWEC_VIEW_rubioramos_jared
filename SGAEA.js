
// Clase Direccion para encapsular atributos de dirección
class Direccion {
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    // Constructor base de la dirección con los atributos encapsulados
    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.#calle = calle;
        this.#numero = numero;
        this.#piso = piso;
        this.#codigoPostal = codigoPostal;
        this.#provincia = provincia;
        this.#localidad = localidad;
    }

    // Métodos get por si fueran necesarios en un futuro
    get calle() {
        return this.#calle;
    }

    get numero() {
        return this.#numero;
    }

    get piso() {
        return this.#piso;
    }

    get codigoPostal() {
        return this.#codigoPostal;
    }

    get provincia() {
        return this.#provincia;
    }

    get localidad() {
        return this.#localidad;
    }
}

class Usuarios {
    #id;
    #nombre;

    constructor(id, nombre) {
        this.#id = id;
        this.#nombre = nombre;
    }

    //setters y getters por si fueran necesarios
    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get id() {
        return this.#id;
    }

    get nombre() {
        return this.#nombre;
    }

    //metodo para hacer overide posteriomente.
    validar_cadenas(cadena) {
        console.log('Validando cadena...');
    }
}

// Clase Estudiante que hereda de Usuarios y añade dirección
class Estudiante extends Usuarios {
    #direccion;

    constructor(id, nombre, direccion) {
        super(id, nombre);
        this.#direccion = direccion;
    }

    /*Metodo override para comprobar las cadenas de texto para el nombre. 
    Se crea una expresion regular para comprobar el nombre para que solo tenga espacios y letras
    Si está bien se deja el nombre como está, pero si no lo está se le pide al usuario una cadena correcta
    hasta que la escriba bien */
    validar_cadenas(cadena) {
        super.validar_cadenas();
        let comprobarCadena = /^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/;
        let salir = false;
        do {
            if (comprobarCadena.test(cadena)) {
                super.nombre = cadena;
                salir = true;
            } else {
                console.log("Nombre invalido. Solo se permiten letras y espacios.");
                cadena = prompt("Escriba el nombre bien. Solo puede contener letras y espacios");
            }
        } while (!salir);
        return cadena;
    }

    //setters y getters por si fuera necesario.
    set nombre(nombre) {
        return super.nombre;
    }
    get id() {
        return super.id;
    }

    get nombre() {
        return super.nombre;
    }

    get direccion() {
        return this.#direccion;
    }
}



/*Clase asignatura, en ella se pone el nombre de la asignatura y unas calificaciones generales para esta, posteriormente se podrán
añadir notas individuales sin afectar a la general, pero si son añadidas aquí si el objeto es compartido afecta a varios alumnos,útil 
si ha habido cualquier nota conjunta*/
class Asignaturas {
    #nombre;
    #calificaciones = [];

    constructor(nombre, calificaciones) {
        this.#nombre = nombre;
        this.#calificaciones = calificaciones;
    }


    set nombre(nombre) {
        return nombre;
    }

    //Metodo igual para el nombre de los alumnos pero ahora para comprobar la cadena de texto
    validar_cadena_asignatura(cadena) {
        let comprobarCadena = /^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/;
        let salir = false;
        do {
            if (comprobarCadena.test(cadena)) {
                super.nombre = cadena;
                salir = true;
            } else {
                console.log("Asignatura. Solo se permiten letras y espacios.");
                cadena = prompt("Escriba el nombre bien. Solo puede contener letras y espacios");
            }
        } while (!salir);
        return cadena;
    }

    //Metodos getter
    get nombre() {
        return this.#nombre;
    }

    get calificaciones() {
        return this.#calificaciones;
    }



    /* Metodo para añadir notas generales a la asignatura en cuestion si se deseara, aunque no es implementado en el codigo del menú se conserva
    por si en un futuro se amplia a más funcionalidades del programa */

    /* El codigo es un doble bucle: El primer bucle no deja de pedir el numero de notas que se quieren introducir hasta que el numero sea correcto,
    este número no puede 0 o menor a este. Una vez se ha indicado el numero se añade un contador con el valor del número de notas a introducir y se
     entra al segundo bucle, siguiendo la misma lógica se piden notas que estén incluidas en el rango de 0 hasta máximo 10. 
     Una vez puesta la calificacion se hace un .push se incrementa el contador y se permite salir del bucle individual. Si el contador llega al
     número de notas pedidas da salida al bucle principal y se acaba el método. Además de lo anterior, el metodo cuenta con un par de control de erroes try catch
     por si no se mete un número en formato válido */
    // asignatura_nota_general() {
    //     let contador = 0;
    //     let calificaciones_nuevas = [];
    //     let notas_a_introducir;
    //     let salir_principal = false;
    //     do {
    //         try {
    //             notas_a_introducir = parseInt(prompt('¿Cuántas notas vas a introducir?'));
    //             if (isNaN(notas_a_introducir) || notas_a_introducir <= 0) {
    //                 console.log('Introduce un número válido de notas.');
    //             }

    //             for (let i = 0; i < notas_a_introducir; i++) {
    //                 let salir_individual = false;

    //                 do {
    //                     try {
    //                         let nota_individual = parseInt(prompt(`Introduce la nota ${i + 1}:`));
    //                         if (isNaN(nota_individual) || nota_individual < 0 || nota_individual > 10) {
    //                             console.log('La nota debe estar entre 0 y 10.');
    //                         } else {
    //                             this.#calificaciones.push(nota_individual);
    //                             salir_individual = true;
    //                             contador++;
    //                         }
    //                     } catch (error) {
    //                         console.log('Formato de nota no válido. Intenta de nuevo.');
    //                     }
    //                 } while (!salir_individual);
    //             }
    //             if (contador == notas_a_introducir) {
    //                 salir_principal = true;
    //             }

    //         } catch (error) {
    //             console.log('Error al introducir las calificaciones. Intenta de nuevo.');
    //         }
    //     } while (!salir_principal);

    //     return calificaciones_nuevas;
    // }

    /*Método para calcular la media por asignatura general.
    El metodo aunque no se implementa en el menú calcula el promedio general de las notas generales puesta a la asignatura
    El método revisa con una estructura que la asignatura no esté vacia o haya habido un error escribiendola con la longitud del array.
    Si no tiene longitud o no hay notas o es que la asignatura es erronea
    */
    // calcular_promedio_asignatura() {
    //     let calificaciones_asignatura = this.#calificaciones;
    //     let suma_valores_calificaciones = 0;
    //     let media;
    //     if (calificaciones_asignatura.length !== 0) {
    //         //Se hace un bucle for para ir recorriendo cada nota individual dentro de su array de notas.
    //         for (let i = 0; i < this.#calificaciones.length; i++) {
    //             suma_valores_calificaciones += this.#calificaciones[i];
    //         }
    //         media = suma_valores_calificaciones / this.#calificaciones.length;
    //     } else {
    //         console.log('No existe esa asignatura o no tiene calificaciones');
    //     }
    //     return media;
    // }
}

/*Clase listado general usada para todos los listados del programa, se llama a su atributolistado_x 
ya que x representa todo lo que puede guardar, desde alumnos, hasta notas a manera de array.*/


class Listados {
    #listado_x;
    constructor(listado_x = []) {
        this.#listado_x = listado_x;
    }

    get listado_x() {
        return this.#listado_x;
    }


    /*Metodo para agregar alumnos a una lista de alumnos
    El metodo controla un parametro tipo objeto, y funciona a modo de condicional: Si el listado contiene la id
    del alumno introducido no dejará añadir el alumno y lo mostrará por consola, si no lo tiene se añadirá al listado,
    para finalmente mostrar el listado y se vea que se ha añadido correctamente (esto último se puede obviar, pero se deja 
    como test para comprobar que se ha añadido);
    */
    agregar_alumno_listado(alumno) {
        if (this.#listado_x.some(a => a.id === alumno.id)) {
            console.log("El alumno ya está en el listado");
        } else {
            this.#listado_x.push(alumno);
            console.log('Alumno agregado: ' + alumno.nombre);

            //Se deja comentado ya que no se ha explicado el método, pero en resumen muestra el listado de alumnos.
            // this.mostrar_listado_alumnos();
        }
    }

    /*Método para eliminar alumnos.
    Se pide el id del alumno por teclado y con un bucle for se recorre las posiciones buscando el id dentro del listado.
    Si se encuentra el id se incrementa un contador en 1 y se guarda el índice para borarrlo posteriormente.
    Si el contador es igual a 0 se indica al usuario que no existe el usuario en el listado y se acaba el programa, pero si existe
    se elimina del listado con un splice indicandole el indice para borrar
    
    Además de eso, cuando se elimina el listado de uno de los listados base (listado asignaturas o listado alumnos) se borra en listado matriculas
    ya que no tiene mucho sentido dejarlo sin actualizar. Esto se hace con un bucle for inverso que corte las posiciones
    donde se encuentre el id del alumno, y que puede haber varios alumnos, además se hace inverso ya que se va recortando la longitud del array por
    cada splice y es mas facil de manejar así*/
    eliminar_alumno_listado(id, lista_matricula) {
        let indice_para_borrar = -1;

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i].id === id) {
                indice_para_borrar = i;
            }
        }

        if (indice_para_borrar === -1) {
            console.log('No existe el alumno en el listado');
        } else {
            this.#listado_x.splice(indice_para_borrar, 1);
            console.log('Alumno borrado con éxito');

            for (let i = lista_matricula.#listado_x.length - 1; i >= 0; i--) {
                if (lista_matricula.#listado_x[i][0].id === id) {
                    lista_matricula.#listado_x.splice(i, 1);
                }
            }
        }
    }




    /*Metodo para añadir asignaturas al listado, es una copia de agregar_alumno_listado, pero cambiando
    lo que se busca  */
    agregar_asignatura_listado(asignatura) {
        if (this.#listado_x.some(a => a.nombre === asignatura.nombre)) {
            console.log("La asignatura ya está en el listado");
        } else {
            this.#listado_x.push(asignatura);
            console.log('Asignatura agregada: ' + asignatura.nombre);
            this.mostrar_listado_asignaturas();
        }
    }

    /*Metodo para borrar asignaturas de un listado, es igual que el de eliminar alumnos del listado */
    eliminar_asignatura_listado(asignatura, lista_matriculas) {
        let indice_para_borrar = -1;

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i].nombre === asignatura) {
                indice_para_borrar = i;
            }
        }

        if (indice_para_borrar === -1) {
            console.log('No existe esa asignatura en el listado');
        } else {
            this.#listado_x.splice(indice_para_borrar, 1);
            console.log('Asignatura con éxito');

            for (let i = lista_matriculas.#listado_x.length - 1; i >= 0; i--) {
                if (lista_matriculas.#listado_x[i][1].nombre === asignatura) {
                    lista_matriculas.#listado_x.splice(i, 1);
                }
            }
        }


    }


    /*Metodo para buscar un patron de texto que coincida parcialmente.
    Se crea un parametro de busqueda que es un texto, y se pasa como parametro de una expresion regular
    ignorando que sea mayúsucla o minúscula. Con un condicional se busca con un condicional que el listado no esté vacio y
    que con la funcion trim que no se introduzca un espacio vacío. Si no pasa la condicion muestra un error y sino busca
    en un for each dentro del listado si está con la funcion test de la expresión regular, si es así se incrementa el contador.
    Si este contador sigue en 0, indicará al usuario que no hay nada en la cadena.*/
    buscar_asignatura(busqueda) {
        let contador = 0;
        let buscar = new RegExp(busqueda, 'i');
        if (this.#listado_x.length === 0 || busqueda.trim() === "") {
            console.log('El listado de asignaturas está vacío o no has escrito bien la cadena');
        } else {
            this.#listado_x.forEach(a => {
                if (buscar.test(a.nombre)) {
                    console.log('Asignatura encontrada: ' + a.nombre);
                    contador++;
                }
            });
            if (contador === 0) {
                console.log('No existe esa asignatura en el listado');
            }
        }
    }

    /*Metodo exacatamente igual que el anterior, pero buscandolo para alumnos */
    buscar_alumnos(busqueda) {
        let contador = 0;
        let buscar = new RegExp(busqueda, 'i');
        if (this.#listado_x.length === 0 || busqueda.trim() === "") {
            console.log('El listado de alumnos está vacío o no has escrito bien la cadena');
        } else {
            this.#listado_x.forEach(a => {
                if (buscar.test(a.nombre)) {
                    console.log('Alumno encontrado: ' + a.nombre);
                    contador++;
                }
            });
            if (contador === 0) {
                console.log('No existe ese alumno en el listado');
            }
        }
    }


    /*Metodo para ver el listado completo de alumnos.
    Con un condicional se comprueba si el listado está vacío indicando que lo está y
    sino se hace un foreach con los nombres de los alumnos.*/
    mostrar_listado_alumnos() {
        if (this.#listado_x.length === 0) {
            console.log("El listado está vacío");
        } else {
            console.log('Listado de estudiantes : ');
            this.#listado_x.forEach(alumno => console.log(alumno.nombre));
        }
    }

    //Metodo para ver el listado de asignaturas, que es exactamente igual al anterior.
    mostrar_listado_asignaturas() {
        if (this.#listado_x.length === 0) {
            console.log("El listado está vacío");
        } else {
            console.log('Listado de asignaturas : ');
            this.#listado_x.forEach(asignatura => console.log(asignatura.nombre));
        }
    }

    /*Metodo para ver las matriculaciones.
    Es parecido a los anteriores, pero se recorre la lista con un bucle for para ir indicandole en cada
    posicion lo que busca*/
    mostrar_matriculaciones() {

        if (this.#listado_x.length == 0) {
            console.log('Listado de matriculaciones vacio');

        } else {
            console.log('Listado de matriculaciones: ')
            for (let i = 0; i < this.#listado_x.length; i++) {
                console.log(`||Alumno : ${this.#listado_x[i][0].nombre} || Asignatura : ${this.#listado_x[i][1].nombre} || Fecha_matricula : ${this.#listado_x[i][2]}`);

            }
        }

    };

    //Metodo para ver las desmatriculaciones. Es igual al anterior, pero solo busca en la lista de desmatriculaciones.
    mostrar_desmatriculaciones() {
        if (this.#listado_x.length == 0) {
            console.log('Listado de desmatriculaciones vacio');

        } else {
            console.log('Listado de desmatriculaciones: ')
            for (let i = 0; i < this.#listado_x.length; i++) {
                console.log(`||Alumno : ${this.#listado_x[i][0].nombre} || Asignatura : ${this.#listado_x[i][1].nombre} || Fecha_matricula : ${this.#listado_x[i][2]} || Fecha_desmatricula : ${this.#listado_x[i][3]}`);

            }
        }
    };


    /*Metodo para matricular a un alumno a un listado de matriculaciones.
    
    El método usa la id del alumno, el nombre a la asignarura, y los listados de alumnos y asignaturas para comprobar
    que tanto la id como el alumno estén previamente en los listados.
    
    Para comprobar esto se hace 3 condicionales para buscarlos dentro de un bucle for en sus listados correspodientes
    , si están se añade un valor a un indice o se incrementa un contador. Si los 2 indices no se modifican en los condicionales y
    el contador no se mantiene como se indica se le indica al usuario y se acaba el metodo. Si se han encontrado en un listado de matriculaciones se añaden ambos
     objetos junto con la fecha de matriculacion en formato europeo dia-mes-año y una copia por referencia de las calificaciones */
    matricular_alumno_asignatura(id, asignatura_nombre, listado_alumnos, listado_asignaturas) {
        let indice_alumno = null;
        let indice_asignatura = null;
        //Se pone un contador para ver si está ya matriculado, ya que con indice es menos práctico.
        let contador_matricula = 0;
        let fecha_matriculacion = new Date();
        let fecha_ES = fecha_matriculacion.toLocaleDateString('es-ES');
        for (let i = 0; i < listado_alumnos.#listado_x.length; i++) {
            if (listado_alumnos.#listado_x[i].id === id) {
                indice_alumno = i;

                //Estas linea están a modo test para comprobar si habia fallos en su implementación
                //console.log('Exito para lista alumno');
            }
            //console.log('No está el alumno aquí');

        }

        for (let i = 0; i < listado_asignaturas.#listado_x.length; i++) {
            if (listado_asignaturas.#listado_x[i].nombre === asignatura_nombre) {
                indice_asignatura = i;
                //console.log('exito para lista asignatura');
            }
            //console.log('No está la asignatura aquí');

        }

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura_nombre) {
                contador_matricula++;
                //console.log('Esta en matricula ya');

            }
        }

        if (indice_alumno === null || indice_asignatura === null || contador_matricula !== 0) {
            console.log('Hay algun alumno o asignatura fuera de los listados o bien la matricula ya está hecha para ese alumno y asignatura');

        } else {
            this.#listado_x.push([listado_alumnos.#listado_x[indice_alumno], listado_asignaturas.#listado_x[indice_asignatura], fecha_ES, [...listado_asignaturas.#listado_x[indice_asignatura].calificaciones]]);
            //this.mostrar_matriculaciones();
        }


        //Codigo original para hacerlo por objeto.
        // if (!listado_asignaturas.listado_x.some(a => a._nombre === asignatura._nombre) ||
        //     !listado_alumnos.listado_x.some(a => a.id === alumno.id)) {
        //     console.log("La asignatura o alumno no está en el listado");
        // } else {
        //     this.listado_x.push([alumno, asignatura, fecha_ES]);
        //     console.log('Matriculado con éxito');
        //     this.mostrar_matriculaciones();
        // }
    }

    //Test para comprobar dónde están los fallos en las matriculaciones si los hubiera.
    /* Consiste en un if anidado que fuerza a la salida cada vez que hay algo mal para que se vea
    todo de manera más clara a la hora de cambiar algo.*/
    test_matricula(id, asignatura_nombre, listado_alumnos, listado_asignaturas) {
        let indice_id = null;
        let indice_asignatura = null;
        let contador_matricula = 0;


        if (id == null || asignatura_nombre == null || listado_alumnos == null || listado_asignaturas == null) {
            console.log('Alguno de los parámetros es nulo');
        } else {

            for (let i = 0; i < listado_alumnos.#listado_x.length; i++) {
                if (listado_alumnos.#listado_x[i].id === id) {
                    console.log('Se ha encontrado el índice del alumno');
                    indice_id = i;
                    break;
                }
                console.log('No está el id');
            }

            if (indice_id === null || listado_alumnos.#listado_x.length === 0) {
                console.log('No está el índice del alumno o has introducido un listado erróneo');
            } else {

                for (let i = 0; i < listado_asignaturas.#listado_x.length; i++) {
                    if (listado_asignaturas.#listado_x[i].nombre === asignatura_nombre) {
                        console.log('Se ha encontrado el índice de la asignatura');
                        indice_asignatura = i;
                        break;
                    }
                }

                if (indice_asignatura === null || listado_asignaturas.#listado_x.length === 0) {
                    console.log('No está la asignatura o bien el listado está vacío');
                } else {

                    for (let i = 0; i < this.#listado_x.length; i++) {
                        if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura_nombre) {
                            contador_matricula++;
                        }
                    }

                    if (contador_matricula !== 0) {
                        console.log('Ya está el alumno matriculado para esa asignatura');
                    } else {

                        const fecha_ES = new Date().toLocaleDateString('es-ES');
                        try {
                            this.#listado_x.push([
                                listado_alumnos.#listado_x[indice_id],
                                listado_asignaturas.#listado_x[indice_asignatura],
                                fecha_ES,
                                [...listado_asignaturas.#listado_x[indice_asignatura].calificaciones]
                            ]);

                        } catch (error) {
                            console.log('Algun parametro está undefined');

                        }

                        let comprobar_matricula = null;

                        for (let i = 0; i < this.#listado_x.length; i++) {
                            if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura_nombre) {
                                comprobar_matricula = i;
                            }

                            if (comprobar_matricula === null) {
                                console.log('Error al introducir el alumno en el array');
                            } else {
                                console.log('Exito al introducir el alumno al array');
                                this.mostrar_matriculaciones();
                            }

                        }
                    }
                }
            }
        }
    }

    /*Metodo para desmatricular a un alumno del listado.
    Es un metodo parecido a otros anteriores para borrar elementos de listados, con la diferencia que ahora
    cuando se borra se añade a un listado de dematriculaciones en el que se añade tambien la fecha de desmatriculaciones */
    desmatricular_alumno_asignatura(id, nombre_asignatura, listado_desmatriculaciones) {
        let fecha_desmatriculacion = new Date();
        let fecha_ES = fecha_desmatriculacion.toLocaleDateString('es-ES');
        let indice_para_borrar = -1;
        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === nombre_asignatura) {
                listado_desmatriculaciones.#listado_x.push([this.#listado_x[i][0], this.#listado_x[i][1], this.#listado_x[i][2], fecha_ES]);
                indice_para_borrar = i;
            }
        }
        if (indice_para_borrar === -1) {
            console.log('No existe el alumno en la asignatura');
        } else {

            this.#listado_x.splice(indice_para_borrar, 1);
            console.log('Alumno desmatriculado con éxito');
            //this.mostrar_matriculaciones();
        }
    }

    /*Metodo para agregar notas individuales a los alumnos matriculados.
    Se pide al usuario el id del alumno y el nombre de la asignatura. Con un bucle for
    se busca en el listado esos parametros y se guarda en un indice. Si este indice no se encuentra y se mantiene
    como null dentro de todo el bucle for se indica al usuario y se acaba. Si lo encuentra se hacen 2 bucles, uno para pedir
    cuantas notas se van a introducir y otra para notas individuales. Si fallan cualquiera de los 2 se vuelve a pedir el número hasta
    que se meta correctamente. Las notas se controla que estén entre 0 y 10, si está todo correcto se da cada salida individiual y luego
    la salida general del bucle añadiendose al listado de matriculaciones en las notas individuales si el contador es igual al numero
    de calificaciones a introducir  */
    agregar_notas_matricula(id, asignatura) {
        let contador = 0;
        let indice_para_calificaciones = null;
        let notas_a_introducir;
        let salir_principal = false;

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura) {
                indice_para_calificaciones = i;
                do {
                    try {
                        notas_a_introducir = parseInt(prompt('¿Cuántas notas vas a introducir?'));
                        if (isNaN(notas_a_introducir) || notas_a_introducir <= 0) {
                            console.log('Introduce un número válido de notas.');
                        }

                        for (let i = 0; i < notas_a_introducir; i++) {
                            let salir_individual = false;

                            do {
                                try {
                                    let nota_individual = parseInt(prompt(`Introduce la nota ${i + 1}:`));
                                    if (isNaN(nota_individual) || nota_individual < 0 || nota_individual > 10) {
                                        console.log('La nota debe estar entre 0 y 10.');
                                    } else {
                                        this.#listado_x[indice_para_calificaciones][3].push(nota_individual);
                                        contador++;
                                        salir_individual = true;
                                    }
                                } catch (error) {
                                    console.log('Formato de nota no válido. Intenta de nuevo.');
                                }
                            } while (!salir_individual);
                            if (contador == notas_a_introducir) {
                                salir_principal = true;
                            }

                        }


                    } catch (error) {
                        console.log('Error al introducir las calificaciones. Intenta de nuevo.');
                    }
                } while (!salir_principal);
            }
        }

        if (indice_para_calificaciones == null) {
            console.log('no existe esa asignatura o alumno en el listado de matriculaciones');
        }
    }

    //Test para ver si se están añadiendo notas correctamente.
    /*El test comparte la funcionalidad de agregar notas pero con la diferencia que se van guardando en un array a parte
    finalmente se comprueba si las notas coinciden con array pop en un bucle inverso (ya que pop extra la última)
    Si las notas x coindicen en posicion en los array se sabe que se ha hecho bien */
    test_meter_notas(id, asignatura) {
        console.log('Prueba de funcionalidad para meter notas');
        let array_notas_nuevas = [];
        let contador = 0;
        let indice_para_calificaciones = null;
        let notas_a_introducir;
        let salir_principal = false;

        if (id === null || asignatura === null) {
            console.log('Uno de tus parámetros es nulo');
        } else {
            console.log('Espacio para introducir notas, como el código general');
            for (let i = 0; i < this.#listado_x.length; i++) {
                if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura) {
                    indice_para_calificaciones = i;
                }
            }

            if (indice_para_calificaciones === null) {
                console.log('No está el alumno o la asignatura en el listado');
            } else {
                console.log('Comprobación de introducción de notas');
                do {
                    try {
                        notas_a_introducir = parseInt(prompt('¿Cuántas notas vas a introducir?'));
                        if (isNaN(notas_a_introducir) || notas_a_introducir <= 0) {
                            console.log('Introduce un número válido de notas.');
                        } else {
                            for (let i = 0; i < notas_a_introducir; i++) {
                                let salir_individual = false;
                                do {
                                    try {
                                        let nota_individual = parseInt(prompt(`Introduce la nota ${i + 1}:`));
                                        if (isNaN(nota_individual) || nota_individual < 0 || nota_individual > 10) {
                                            console.log('La nota debe estar entre 0 y 10.');
                                        } else {
                                            array_notas_nuevas.push(nota_individual);
                                            this.#listado_x[indice_para_calificaciones][3].push(nota_individual);
                                            contador++;
                                            salir_individual = true;
                                        }
                                    } catch (error) {
                                        console.log('Formato de nota no válido. Intenta de nuevo.');
                                    }
                                } while (!salir_individual);
                            }
                            if (contador == notas_a_introducir) {
                                salir_principal = true;
                            }
                        }
                    } catch (error) {
                        console.log('Error al introducir las calificaciones. Intenta de nuevo.');
                    }
                } while (!salir_principal);
            }

            // Comprobación de notas
            console.log('Espacio para comprobar notas');
            console.log('Notas almacenadas en el listado:', this.#listado_x[indice_para_calificaciones][3]);
            console.log('Notas introducidas:', array_notas_nuevas);

            //Se comprueban las notas comprobando reduciendo -1 ya que parte de 0
            for (let index = array_notas_nuevas.length - 1; index >= 0; index--) {
                if (this.#listado_x[indice_para_calificaciones][3].pop() === array_notas_nuevas.pop()) {
                    console.log('Nota correcta en la posición ' + index);
                } else {
                    console.log('Nota incorrecta en la posición ' + index);
                }
            }
        }
    }




    /*Metodo para filtrar las asignaturas por alumno.
    Con el id del alumno se pasa por un bucle y para cada posicion en la que esté el alumno
    se imprime el nombre de la asignatura.  */
    listado_asignatura_por_alumno(id) {
        console.log('Listado de asignaturas por alumno: ');
        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id) {
                console.log(this.#listado_x[i][1].nombre);
            }
        }

    }

    /*Metodo para calcular el promedio de asignaturas inviduales.
    Se comprueba primero que los parametros estén dentro del listado con bucles for y se asignan valores
    a los indices. Si algo de los indices es null se acaba el metodo y se le indica al usuario que no están en el listado
    el alumno o asignatura.
    Si se encuentran se recorre con un bucle cada nota y se va sumando en un contador y luego se divide entre la longitud del array */
    promedio_notas_indidivuales_asignatura(id, asignatura) {
        let indice_asignatura = -1;
        let suma = 0;
        let media;


        if (id.trim() === '' || asignatura.trim() === '') {
            console.log('Parámetros vacíos');
            return null;
        } else {

            for (let i = 0; i < this.#listado_x.length; i++) {
                if (this.#listado_x[i][0].id === id && this.#listado_x[i][1].nombre === asignatura) {
                    indice_asignatura = i;
                    //aunque no se recomiende break, por dejarlo de otra manera hecha´.
                    break;
                }
            }

            if (indice_asignatura === -1) {
                console.log('No existe ese id de alumno o la asignatura');
                return null;
            } else {
                // Aquí se va sumando según indice
                for (let i = 0; i < this.#listado_x[indice_asignatura][3].length; i++) {
                    suma += this.#listado_x[indice_asignatura][3][i];
                }

                // Aquí se ve el promedio
                media = Math.round(suma / this.#listado_x[indice_asignatura][3].length);

                // Estos mensajes comentados sirven para adornar la salida, pero no termina de funcionar para la media general.
                // const mensaje = `Promedio de notas para ${id} en la asignatura ${asignatura}: ${media}`;
                // console.log(mensaje);
                return media;
            }
        }
    }




    /*Metodo para calcular el promedio general de un alumno en todas las asignaturas.
    Es parecido al anterior en estructura, pero con la diferencia que se van acumulando en el contador
    el promedio volviendo a la funcion anterior para luego dividirlo entre el numero hecho con un contador de asignaturas */
    promedio_notas_alumno(id) {
        let suma_promedios = 0;
        let media_promedios = 0;
        let contador_asignaturas = 0;


        if (id.trim === '' || id === null) {

        } else {
            for (let i = 0; i < this.#listado_x.length; i++) {

                if (this.#listado_x[i][0].id === id) {

                    let promedio_asignatura = this.promedio_notas_indidivuales_asignatura(
                        this.#listado_x[i][0].id,
                        this.#listado_x[i][1].nombre
                    );

                    if (promedio_asignatura !== null) {
                        suma_promedios += promedio_asignatura;
                        contador_asignaturas++;
                    }
                }
            }

            if (contador_asignaturas === 0) {
                console.log("No se encontraron asignaturas para este alumno.");
                return null;
            } else {
                media_promedios = suma_promedios / contador_asignaturas;
                return media_promedios;
            }
        }


    }


    /*Metodo para calcular el promedio por asignatura.
    Parecido a los anteriores en estructura pero se hace un doble bucle para una vez encontrado
    el indice de la asignatura se vayan guardando las calificaciones individuales de cada alumno. */
    promedio_notas_asignatura(asignatura) {
        let suma_calificaciones = 0;
        let total_calificaciones = 0;

        if (asignatura === null || asignatura.trim() === '') {
            console.log('asignatura vacia');
        } else {
            for (let i = 0; i < this.#listado_x.length; i++) {
                if (this.#listado_x[i][1].nombre === asignatura) {
                    for (let j = 0; j < this.#listado_x[i][3].length; j++) {
                        suma_calificaciones += this.#listado_x[i][3][j];
                        total_calificaciones++;
                    }
                }
            }

            if (total_calificaciones === 0) {
                console.log("No se encontraron calificaciones para la asignatura:", asignatura);
            } else {
                let promedio = Math.round(suma_calificaciones / total_calificaciones);

                console.log(`Promedio de la asignatura general ${asignatura}: ` + promedio);
            }

        }


    }

    /*Metodo para calcular la media de todos los alumnos.
    Parecido a los anteriores, pero con un array para guardar las id de cada alumno, ya que hay riesgo de que se repita el alumno
     */
    promedio_todos_estudiantes() {
        let contador_alumnos = 0;
        let sumar_promedios = 0;
        let contador_ids = [];

        for (let i = 0; i < this.#listado_x.length; i++) {
            let id = this.#listado_x[i][0].id;
            let promedio_alumno = this.promedio_notas_alumno(id);
            //linea test para ver si se estaba repitiendo el alumno
            // console.log(`Promedio de alumno: ${this.listado_x[i][0].nombre}` + promedio_alumno);            

            if (promedio_alumno !== null && !contador_ids.includes(id)) {
                sumar_promedios += promedio_alumno;
                contador_ids.push(this.#listado_x[i][0].id);
                contador_alumnos++;
            }
        }

        if (contador_alumnos === 0) {
            console.log('No hay alumnos en el listado');

        }
        let media_alumnos_general = Math.round(sumar_promedios / contador_alumnos);
        return media_alumnos_general;
    }

    /*Metodo para mostrar todos los datos individuales del alumno en el listado.
     Cuenta con un array que va guardando las combinaciones entre asignatura e id para que no se repita
     El metodo parte de un booleano en false y entra a un bucle que va buscando los datos que interesa en el listado, ya que el alumno
     no se ha repetido se entra al bucle y marca la primera linea que indica su nombre y promedio general. Esto ya no se repetira más ya que ahora
     el valor es true. 
     
     Posteriormete se crea una combinacion de atributos y con some se comprueba está dentro del array de combinaciones, si no lo está lo incorpora
     e imprime todo lo necesario para las asignturas que sean necesarias*/
    reporte_alumno_individual(id) {
        let combinaciones_repetidas = [];
        let alumno_repetido = false;
        let nombre_alumno = '';

        for (let i = 0; i < this.#listado_x.length; i++) {
            if (this.#listado_x[i][0].id === id) {
                if (!alumno_repetido) {
                    alumno_repetido = true;
                    nombre_alumno = this.#listado_x[i][0].nombre;
                    console.log('Alumno  : ' + nombre_alumno + ' || Promedio general: ' + this.promedio_notas_alumno(this.#listado_x[i][0].id));
                }

                //Esto se puede declarar al principio, pero por hacerlo distinto.
                let combinacion = [this.#listado_x[i][0].id, this.#listado_x[i][1].nombre];

                // Imprimir solo si la combinación no está en el array.
                if (!combinaciones_repetidas.some(a => a[0] === combinacion[0] && a[1] === combinacion[1])) {
                    console.log('|| Asignatura: ' + this.#listado_x[i][1].nombre +
                        ' || Calificaciones : ' + this.#listado_x[i][3] +
                        ' || Promedio : ' + this.promedio_notas_indidivuales_asignatura(this.#listado_x[i][0].id, this.#listado_x[i][1].nombre) +
                        ' || Fecha  matriculacion : ' + this.#listado_x[i][2]);
                    combinaciones_repetidas.push(combinacion);
                }
            }
        }

        if (!alumno_repetido) {
            console.log('Error, no se ha encontrado el alumno.');
        }
    }

    /*Metodo para reporte general de alumnos, para que no haya problemas con el anterior, ya que se llama para cada id,
    se crea un array con los id repetidos, ya que sino le puede pasar el mismo id y que se imprima x veces */
    mostrar_reporte_total() {
        console.log('reporte total');

        let ids_repetido = [];

        for (let i = 0; i < this.#listado_x.length; i++) {
            let id = this.#listado_x[i][0].id;
            if (!ids_repetido.includes(id)) {
                this.reporte_alumno_individual(id);
                ids_repetido.push(id);
            }
        }
    }
}


/*Parte donde se corre el código, pero antes se hacen un par de funciones más. */

/*Funcion para pedir texto al usuario, ya que se va a usar un menú e indicarle instrucciones al usuario de lo que tiene que escribir.
La funcion principal es ahorrar líneas de código y no escribir todo de nuevo, y corregir que no sea entrada null o espacio vacio. */
function pedir_string(texto) {
    salir = false;
    do {
        let cadena = prompt(`Dime qué ${texto} :`);
        if (cadena === null || cadena.trim() === '') {
            console.log('Cadena vacia o invalida');
        } else {
            salir = true;
            return cadena;
        }

    } while (!salir);

}

/*Funcion para pedir números al usuario, principalmente usado para controlar los errores del menú en el switch.
En este metodo se pide número hasta que te de el correcto evitando tanto cadenas de texto como números negativos */
function pedir_numero() {
    let salir = false;
    let numero;
    do {
        try {
            numero = parseInt(prompt('Escribe un número que no sea menor a 0:'));
            if (isNaN(numero)) {
                console.log('No has introducido un número válido.');
            } else if (numero < 0) {
                console.log('Has escrito un número menor a 0.');
            } else {
                salir = true;
            }
        } catch (error) {
            console.log('Ocurrió un error inesperado.');
        }
    } while (!salir);
    return numero;
}

//Creacion de los objetos para que no de error el menú.
const direccion_1 = new Direccion('Calle ejemplo 1', '22', '1A', '12345', 'Burgos', 'Burgos');
const estudiante_1 = new Estudiante('123456', 'Pepe Sanchez', direccion_1);
const estudiante_2 = new Estudiante('111111', 'Antonio Sanchez', direccion_1);
const estudiante_3 = new Estudiante('222222', 'Raul Sanchez', direccion_1);

const asignatura_1 = new Asignaturas('Matematicas', [5, 5, 5]);
const asignatura_2 = new Asignaturas('Lengua', [8, 8, 8]);
const asignatura_3 = new Asignaturas('Inglés', [1, 2, 3]);

const listado_alumnos = new Listados([estudiante_1, estudiante_2, estudiante_3]);
const listado_asignaturas = new Listados([asignatura_1, asignatura_2, asignatura_3]);
const listado_matriculas = new Listados([
    [estudiante_1, asignatura_1, "22-05-2021", [...asignatura_1.calificaciones]],
    [estudiante_1, asignatura_2, "22-05-2021", [...asignatura_2.calificaciones]],
    [estudiante_2, asignatura_3, "22-05-2021", [...asignatura_3.calificaciones]],
    [estudiante_3, asignatura_1, "22-05-2021", [...asignatura_1.calificaciones]],
]);
let listado_desmatriculaciones = new Listados([[estudiante_3, asignatura_2, "22-01-1998", '22-02-2007']]);

//Codigos para testear.
// listado_matriculas.test_matricula('123456','Inglés',listado_alumnos,listado_asignaturas);
// listado_matriculas.test_meter_notas('123456', 'Matematicas');

// Código del menú
let salir_menu = false;
let opcion_menu;

// Se crea un menú usando un bucle para permitir varias gestiones a la vez, cuando se pulse 0 se saldrá.
do {
    console.log(
        'Bienvenido al programa de gestión de alumnos. Escribe una opción del menú:\n' +
        '0- Salir\n' +
        '1- Ver listado de alumnos\n' +
        '2- Ver listado de asignaturas\n' +
        '3- Ver listado de matriculaciones\n' +
        '4- Ver listado de desmatriculaciones\n' +
        '5- Buscar un alumno por texto\n' +
        '6- Agregar un alumno al listado\n' +
        '7- Eliminar un alumno del listado\n' +
        '8- Buscar una asignatura por texto\n' +
        '9- Agregar una asignatura al listado\n' +
        '10- Eliminar una asignatura del listado\n' +
        '11- Matricular a un alumno en una asignatura\n' +
        '12- Desmatricular a un alumno de una asignatura\n' +
        '13- Agregar notas a un estudiante\n' +
        '14- Consultar promedio de un alumno general\n' +
        '15- Consultar promedio de un alumno por asignatura\n' +
        '16- Consultar promedio de una asignatura\n' +
        '17- Consultar promedio general de alumnos\n' +
        '18- Consultar reporte general\n'
    );

    opcion_menu = pedir_numero();

    switch (opcion_menu) {
        case 0:
            console.log('Hasta la próxima.');
            salir_menu = true;
            break;

        case 1:
            console.log('Ver listado de alumnos.');
            listado_alumnos.mostrar_listado_alumnos();
            break;

        case 2:
            console.log('Ver listado de asignaturas.');
            listado_asignaturas.mostrar_listado_asignaturas();
            break;

        case 3:
            console.log('Ver listado de matriculaciones.');
            listado_matriculas.mostrar_matriculaciones();
            break;

        case 4:
            console.log('Ver listado de desmatriculaciones.');
            listado_desmatriculaciones.mostrar_desmatriculaciones();
            break;

        case 5:
            console.log('Buscar un alumno por texto.');
            let buscar_alumno = pedir_string('texto vas introducir para buscar el alumno');
            listado_alumnos.buscar_alumnos(buscar_alumno);
            break;

        case 6:
            console.log('Agregar un alumno al listado.');
            let nombre = pedir_string('nombre para el alumno');
            let id = pedir_string('ID del alumno para el alumno');
            let calle = pedir_string('Calle nombre para el alumno');
            let numero = pedir_string('Número nombre para el alumno');
            let piso = pedir_string('Piso nombre para el alumno');
            let codigo_postal = pedir_string('Código Postal nombre para el alumno');
            let provincia = pedir_string('Provincia nombre para el alumno');
            let localidad = pedir_string('Localidad nombre para el alumno');
            const estudiante_nuevo = new Estudiante(id, nombre, new Direccion(calle, numero, piso, codigo_postal, provincia, localidad));
            estudiante_nuevo.validar_cadenas(nombre);
            listado_alumnos.agregar_alumno_listado(estudiante_nuevo);
            break;

        case 7:
            console.log('Eliminar un alumno del listado.');
            listado_alumnos.mostrar_listado_alumnos();
            let elegir_alumno = pedir_string(' ID de alumno para borrar');
            listado_alumnos.eliminar_alumno_listado(elegir_alumno, listado_matriculas, listado_desmatriculaciones);
            listado_alumnos.mostrar_listado_alumnos();
            break;

        case 8:
            console.log('Buscar una asignatura por texto.');
            let buscar_asignatura = pedir_string('texto para buscar asignatura');
            listado_asignaturas.buscar_asignatura(buscar_asignatura);
            break;

        case 9:
            console.log('Agregar una asignatura al listado.');
            let nombre_asignatura = pedir_string('nombre de la asignatura para agregar');
            const asignatura_nueva = new Asignaturas(nombre_asignatura, null);
            asignatura_nueva.validar_cadena_asignatura(nombre_asignatura);
            listado_asignaturas.agregar_asignatura_listado(asignatura_nueva);
            break;

        case 10:
            console.log('Eliminar una asignatura del listado.');
            let nombre_asignatura_borrar = pedir_string('nombre de la asignatura para borrar');
            listado_asignaturas.eliminar_asignatura_listado(nombre_asignatura_borrar, listado_matriculas);
            break;

        case 11:
            console.log('Matricular un alumno en una asignatura.');
            let id_alumno = pedir_string('ID del alumno a matricular');
            let asignatura_nombre = pedir_string('Nombre de la asignatura a matricular');
            listado_matriculas.matricular_alumno_asignatura(id_alumno, asignatura_nombre, listado_alumnos, listado_asignaturas);
            break;

        case 12:
            console.log('Desmatricular un alumno de una asignatura.');
            let id_alumno_borrar = pedir_string('ID del alumno para desmatricular');
            let asignatura_nombre_borrar = pedir_string('Nombre de la asignatura para desmatricular');
            listado_matriculas.desmatricular_alumno_asignatura(id_alumno_borrar, asignatura_nombre_borrar, listado_desmatriculaciones);
            break;

        case 13:
            console.log('Agregar notas a un estudiante.');
            let alumnos_asignar_notas = pedir_string('ID del alumno para asignar notas');
            let asignatura_asignar_notas = pedir_string('Asignatura a la que añadir notas');
            listado_matriculas.agregar_notas_matricula(alumnos_asignar_notas, asignatura_asignar_notas);
            break;

        case 14:
            console.log('Consultar promedio de un alumno general.');
            let consultar_alumno_general = pedir_string('ID del alumno para consultar promedio general');
            listado_matriculas.promedio_notas_alumno(consultar_alumno_general);
            break;

        case 15:
            console.log('Consultar promedio de un alumno por asignatura.');
            let consultar_alumno = pedir_string('ID del alumno para consultar promedio por asignatura');
            let consultar_asignatura = pedir_string('Nombre de la asignatura para la que ver promedio');
            console.log(`Promedio en ${consultar_asignatura}: ` + listado_matriculas.promedio_notas_indidivuales_asignatura(consultar_alumno, consultar_asignatura));
            break;

        case 16:
            console.log('Consultar promedio de una asignatura.');
            let promedio_asignatura = pedir_string('Nombre de la asignatura para consultar promedio de alumnos');
            listado_matriculas.promedio_notas_asignatura(promedio_asignatura);
            break;

        case 17:
            console.log('Consultar promedio general de alumnos.');
            console.log(`Promedio general de estudiantes: ` + listado_matriculas.promedio_todos_estudiantes());
            break;

        case 18:
            console.log('Consultar reporte general.');           
            listado_matriculas.mostrar_reporte_total();
            break;

        default:
            console.log('No existe esa opción del menú.');
            break;
    }
} while (!salir_menu);

