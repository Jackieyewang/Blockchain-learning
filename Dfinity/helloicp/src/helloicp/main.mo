import Array "mo:base/Array";

actor {
    func quicksort(arr : [var Int], low : Nat, high : Nat) {
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
        if( x > 0 )quicksort(arr, low, x - 1);
        quicksort(arr, x + 1, high);
    };
    public func qsort(arr: [Int]): async [Int] {
        var i = 0;
        for (arr in arr.vals()) i := i +1;
        let array : [var Int] = Array.thaw(arr);
        quicksort(array,0,i-1);
        Array.freeze(array);
    }
}
