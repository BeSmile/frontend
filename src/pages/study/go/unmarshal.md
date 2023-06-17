# Unmarshal

json 转换过程中对于不同的类型转换之后的 interface 也不同

```
bool, for JSON booleans
float64, for JSON numbers
string, for JSON strings
[]interface{}, for JSON arrays
map[string]interface{}, for JSON objects
nil for JSON null
```
