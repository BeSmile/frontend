# ASCII

## go 当中字符输出 ASCII 码

### 方法 1

sprintf 输出`ca`进行打印

```go
    package main

    import (
    "fmt"
    )

  func main() {
	  var introduction string

	  // initializing the introduction string
	  introduction = "TutorialsPoint"
	  fmt.Println("ASCII of ",introduction,"is")

	  // printing the ASCII value of each character using %d specifier
	  for i := 0; i < len(introduction); i++ {
		  fmt.Printf("The ASCII value of %ca is %d \n", introduction[i], introduction[i])
	  }
	  fmt.Println("(Printing the ASCII value using specifier)")
  }

```

### 方法 2

```go
package main

// fmt package provides the function to print anything
import (
   "bufio"
   "fmt"
   "os"
   "strings"
)
func main() {

   // declaring the variable of string type using the var keyword
   var dateOfBirth string
   fmt.Println("Can you please write down your Date of Birth?")

   // scanning the input by the user
   inputReader := bufio.NewReader(os.Stdin)
   dateOfBirth, _ = inputReader.ReadString('\n')

   // remove the delimiter from the string
   dateOfBirth = strings.TrimSuffix(dateOfBirth, "\n")

   // printing the ASCII value of each character using %d specifier
   for i := 0; i < len(dateOfBirth); i++ {
      fmt.Println("The ASCII value of", string(dateOfBirth[i]), "is", int(dateOfBirth[i]))
   }
   fmt.Println("(Printing the ASCII value using Type Casting)")
}

```

### 方法 3

```go
package main

import "fmt"

func main() {
	// Example - 1
	str := "GOLANG"
	runes := []rune(str)

	var result []int

	for i := 0; i < len(runes); i++ {
		result = append(result, int(runes[i]))
	}

	fmt.Println(result)

	// Example - 2
	s := "GOLANG"
	for _, r := range s {
		fmt.Printf("%c - %d\n", r, r)
	}
}
```

## ASCII 码转字符

`%c`进行输出打印

### 方法 1

```go
package main

import "fmt"

func main() {
	asciiValue := 97
	character := rune(asciiValue)

	fmt.Printf("Character corresponding to Ascii Code %d = %c\n", asciiValue, character)
}
```
