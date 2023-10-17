class Node():
    def __init__(self, word) -> None:
        self.word = word
        self.neighbors = []
    
class TextInpreter():

    def __init__(self) -> None:
        self.root = self.create_binary_tree()

    def print_binary_tree(self) -> None:
        root = self.root
        if root is None:
            return
        stack = [(root, 0)]

        while stack:
            current, depth = stack.pop()
            print("|   " * depth + "|-- " + current.word)
            for neighbor in reversed(current.neighbors):
                stack.append((neighbor, depth + 1)) 

    def create_binary_tree(self)-> Node:
        root = Node("root")
        pointer = root

        #first level
        como = Node("como")
        cuantos = Node("cuantos")
        donde = Node("donde")
        pointer.neighbors.append(como)
        pointer.neighbors.append(cuantos)
        pointer.neighbors.append(donde)
        pointer = como

        #como level
        pago = Node("pago")
        acomodado = Node("acomodado")
        renuevo = Node("renuevo")
        busco = Node("busco")
        como.neighbors.append(pago)
        como.neighbors.append(acomodado)
        como.neighbors.append(renuevo)
        como.neighbors.append(busco)

        #como-pago level
        multa = Node("multa")
        pago.neighbors.append(multa)

        #como-acomodado level
        libros = Node("libros")
        acomodado.neighbors.append(libros)

        #como-renuevo level
        prestamo = Node("prestamo")
        renuevo.neighbors.append(prestamo)

        #cuantos level
        tiempo = Node("tiempo")
        libros = Node("libros")
        comic = Node("comic")
        cuantos.neighbors.append(tiempo)
        cuantos.neighbors.append(libros)
        cuantos.neighbors.append(comic)

        #cuantos-tiempo level
        prestan = Node("prestan")
        tiempo.neighbors.append(prestan)

        #cuantos-tiempo-prestan-libros level
        libro = Node("libro")
        prestan.neighbors.append(libro)

        #cuantos-comic level
        titulo = Node("titulo")
        seccion = Node("seccion")

        comic.neighbors.append(titulo)
        comic.neighbors.append(seccion)

        #cuantos-comic-seccion level
        seccion_espeficica = Node("seccion_espeficica")
        seccion.neighbors.append(seccion_espeficica) 

        #cuantos-libros level
        titulo = Node("titulo")
        seccion = Node("seccion")
        libros.neighbors.append(titulo)
        libros.neighbors.append(seccion)   

        #cuatos-libros-seccion level
        seccion_espeficica = Node("seccion_espeficica")
        seccion.neighbors.append(seccion_espeficica)

        #donde level
        area = Node("area")
        seccion = Node("seccion")
        solicito = Node("solicito")
        comic = Node("comic")
        libro = Node("libro")
        compro = Node("compro")
        prestan = Node("prestan")
        entrego = Node("entrego")
        pago = Node("pago")

        donde.neighbors.append(area)
        donde.neighbors.append(seccion)
        donde.neighbors.append(solicito)
        donde.neighbors.append(comic)
        donde.neighbors.append(libro)
        donde.neighbors.append(compro)
        donde.neighbors.append(prestan)
        donde.neighbors.append(entrego)
        donde.neighbors.append(pago)

        #donde-seccion level
        seccion_espeficica = Node("seccion_espeficica")
        seccion.neighbors.append(seccion_espeficica)

        #donde-solicito level
        prestamo = Node("prestamo")
        solicito.neighbors.append(prestamo)

        #donde-comic level
        titulo = Node("titulo")
        comic.neighbors.append(titulo)  
        
        #donde-libro level
        titulo = Node("titulo")
        libro.neighbors.append(titulo)

        #donde-compro level
        libro = Node("libro")
        compro.neighbors.append(libro)

        #donde-prestan level
        libro = Node("libro")
        prestan.neighbors.append(libro)

        #donde-entrego 
        libro = Node("libro")
        entrego.neighbors.append(libro)

        #donde-pago level
        multas = Node("multas")
        pago.neighbors.append(multas)

        return root

    

cosa = TextInpreter()
cosa.print_binary_tree()
    