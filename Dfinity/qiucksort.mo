import Debug "mo:base/Debug";
import Int "mo:base/Int";

func qsort(arr : [var Int], low : Nat, high : Nat) {
    if (low > high) return;
    var pivot:Int = arr[low];
    var x = low;
    var y = high;
    while (x < y) {
        while (x < y and arr[y] >= pivot) y := y - 1;
        while (x < y and arr[x] <= pivot) x := x + 1;
        if(x < y) {
            var temp = arr[x];
            arr[x] := arr[y];
            arr[y] := temp;
        }
   };
    arr[low] := arr[x];
    arr[x] := pivot;
    var b = "";
    for (i in a.vals()){
        b := b # Int.toText(i) # " ";
    };
    Debug.print(b);
    if( x > 0 )qsort(arr, low, x - 1);
    qsort(arr, x + 1, high);
};

func Quicksort(arr : [var Int]) {
    var i = 0;
    for (arr in arr.vals()) i := i +1;
    qsort(arr,0,i-1);
};

let a : [var Int] = [var 10,2,1,6,4,5,7,100,32,77,54];
Quicksort(a);
var b = "";
for (i in a.vals()){
    b := b # Int.toText(i) # " ";
};
Debug.print(b);
