---
layout: post
title: Curried Function in Java
date:   2015-01-31 07:27:00
categories: java
tags: currying-functions functions
comments: true
analytics: true
---

<strong>Currying</strong> is a technique of transforming a function with multiple arguments into a function with just single argument. The single argument is the value of the first argument from the original function and it returns another single argument function. This in turn would take the second original argument and itself return another single argument function. This kind of chaining continues over the arguments of the original. The last in the chain will have access to all the arguments and so can do whatever it needs to do.

You can turn any function with multiple arguments into its curried equivalent. Lets have a look at the Curryied function in Java 7 vs Java 8.

### Java7 ###

For example, we have a function ```add``` specified below
{% highlight java %}
public function add ( int a, int b ) {
	return a+b;
}
{% endhighlight %}

This can be curried into something like this ( where ```Function<A,B>``` defines a single method ```B apply(A a)```)
{% highlight java %}
public static Function<Integer, Function<Integer, Integer>> add() {
	return new Function<Integer, Function<Integer, Integer>>() {
		{{"@"}}Override
		public Function<Integer, Integer> apply( final Integer valueX ) {
			return new Function<Integer, Integer>(){
				{{"@"}}Override
				public Integer apply( Integer valueY) {
					return valueX + valueY;
				}
			};
		}
	};
}
{% endhighlight %}

Now lets check the calling these functions, first original method
{% highlight java %}
add(1 , 1);					// results into value 2
{% endhighlight %}

and calling our curried function
{% highlight java %}
add();						// results into a instance of Function<[A, B]>
add().apply(1);				// results into a instance of Funciton<[A, B]>
add().apply(1).apply(1);	// results into value 2
{% endhighlight %}

### Java 8 ###

In Java 8, its is much less verbose using lambda syntax compared to Java 7 Example.
{% highlight java %}
public static Function<Integer, Function<Integer,Integer>> add() {
	return x -> y -> x + y;
}
{% endhighlight %}
