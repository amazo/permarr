var fs = require('fs');

// list permutations in a separate window
exports.create = function create(number, select)
{
    var fstream = fs.createWriteStream('keys.dat');
    fstream.on('open', function(){
        value = new Array()

        var a = new Array();                           // initialize
        for (i = 0; i < select; i++)
            a[i] = i + 1;                              // 1 - 2 - 3 - 4 - ...

        while (true)
        {
            for (n = 0; n < select; n++)
                value[n] = a[n];

            // for this combination, list permutations in lexicographical order
            fstream.write(new Buffer(put_next(select)));
            while (get_next(select))
                fstream.write(new Buffer(put_next(select)));

            // generate next combination in lexicographical order
            i = select - 1;                            // start at last item
            while (a[i] == (number - select + i + 1))  // find next item to increment
                --i;

            if (i < 0) break;                          // all done
            ++a[i];                                    // increment

            for (j = i + 1; j < select; j++)           // do next combination
                a[j] = a[i] + j - i;
        }

        fstream.end();
    });

}

// compute the number of permutations of r objects from a set on n objects
function permutations( n, r )
{
    var c = parseInt("1");
    if (r > n) return 0;
    var d = n - r;

    while (n > 0)
    {
        c = c * n;
        --n;
    }

    while (d)
    {
        c = c / d;
        --d;
    }

    return c;
}

var value;

// compute the next permutation given the current permutation
function get_next( k )
{
    var i = k - 1;
    while (value[i-1] >= value[i])
        i--;

    if (i < 1) return false;                       // all in reverse order

    var j = k;
    while (value[j-1] <= value[i-1])
        j--;

    swap(i - 1, j - 1);

    i++;
    j = k;

    while (i < j)
    {
        swap(i - 1, j - 1);
        i++;
        j--;
    }

    return true;
}

function swap( a, b )
{
    temp     = value[a];
    value[a] = value[b];
    value[b] = temp;
}

function put_next( k )
{
    var result = [];
    for (i = 0; i < k; i++)
        result.push(value[i]);
    return result;
}
