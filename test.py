# custom errors in python
a = int(input("Enter any number btw 5 and 9 : "))

if 5<a<9:
    print("You have entered a valid number")
else:
    raise ValueError("The number is not in the valid range")