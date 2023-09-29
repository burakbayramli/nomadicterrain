## Calculation of decans

This software package is built on the SwissEph package. It strives to
provide a cleaner interface for decan calculation to SwissEph, without
having to learn its details.

Among the things we improved;

* We provide a *precompiled* source base for SwissEph. The package, as
it is found on the Web, makes it necessary to pass through a
precompilation stage, similar to software written in C, C++ using
`#define`, `#endif` constructs. However, this usage is very un-Java,
hence only one version of the source is included in this package. This
saves the programmer from understanding unnecessary details of the
package involved.

* Calculating the decan (decanate) of planets needed for a certain
date in question. This was very hard to access through the SwissEph
regular functions, so we hacked through the command line interface
making SwissEph believe we were using it through the command line, we
parse the output, providing you the nice information necessary for
further calculations, through a simple `calc()` function.

## COMPILING

On Ubuntu run `sudo apt install default-jdk`

Then issue

`javac -classpath src/java/:lib/commons-lang3-3.13.0.jar src/java/org/jlewi/GenerateDecans.java`

## HOW TO USE

You can generate all decans for a long time period by using

```
java -classpath src/java/:lib/commons-lang3-3.13.0.jar org.jlewi.GenerateDecans
```

which calls `GenerateDecans.java` class. The output will be under
`/tmp/decans.dat`. For more details see `SampleTest.java`.
