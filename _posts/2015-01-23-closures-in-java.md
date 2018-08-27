---
layout: post
title: 'Closures in Java'
date:   2015-01-23 00:10:00
categories: java
tags: closures functions
comments: true
analytics: true
---

Working on last few projects, i've realized that use of closures can come really handy in day-to-day work.
Can you imagine writing loops after loops to extract or collect properties from list of custom objects? It can be tiring and painful. And hence, I have decided to add this post - mainly to point out couple of situations where introduction to  closures can really ease this pain.

Most of you must have used [<i>Project Lambok</i>](https://projectlombok.org) or <i>Functional Java</i> to achive this. Unfortunately not everyone gets the choice to be able to use opensource libraries. Yeah, there are clients who prefers to avoid use of opensource libraries in this day and age, can you believe it ? Anyways, i have tried to point out some of the features offerred by closures in this post.

Before going forward in more details, let's try and understand what closures mean in Java and what it can bring on the table. 
A Closure is a first class function or reference to a function together with a referencing environment. Most of the time, function types, anonumous functions and inline function-valued expressions are also refered as closures in java. An anonymous function that contains some context surrounding it as a snapshot & can be passed as a parameter. The definition of closure can be broken down into two main parts - callbacks and contextual information surrounding this callback function. 

Please note, Anonymous classes in java are close to being called as closures, but they do not fully support definition of closure. But they come close to it and hence you can find lot of literature calling anonymous inner classes as closures. The main reason behind not supporting definition, is due to the fact that inner class can only access <strong><i>final</i></strong> local variable of the enclosing method. And also, because these variables get created and stored in a stack, they get  destroyed when execution of the method completes and result gets returned. And If you want to make an anonymous inner class as a closure, it should be allowed to access all the fields surrounding body - which is not permissible by current memory management.

Enough with the explanation, let's look at some of the examples!

In pre Java 8, versions we can simulate closures

{% highlight java %}
public interface Funct<A,B> {
public B func(A a);
}
{% endhighlight %}

We can use this interface to emulate anonymous inner class easily. Below mentioned methods can be used to perform simple comparison tasks and can be later extended to combine with interface ```Funct<A,B>``` to simulate closures.

Method to retrieve larger values compared to provided comparison value:

{% highlight java %}
public static int larger( final List<Integer> objectList, final Integer refObj ){
	for( Integer comparedObj : objectList ){
		if( comaredObj > refObj ){
			return comparedObj;
		}
	}
	return refObj;
}
{% endhighlight %}

Another method to determine smaller value compared to provided comparison value:

{% highlight java %}
public static int smaller( final List<Integer> objectList, final Integer refObj ){
	for( Integer comparedObj : objectList ){
		if( comparedObj < refObj ){
			return comparedObj;
		}
	}
	return refObj;
}
{% endhighlight %}

These method are very identical - except the conditions. These can be combined using above mentioned interface like this:

{% highlight java %}
public static <T> T firstMatch( final List<T> objectList, final Funct<T, Boolean> functor, T refObj ){
	for( T comparedObj : objectList ){
		if(functor.func(comparedObj)){
			return comparedObj;
		}
	}
	return refObj;
}
{% endhighlight %}

This method can be used as :
{% highlight java %}
Func<Integer,Boolean> greaterThanFive = new Func<Integer,Boolean>{
	Boolean func(Integer no){
		return no > 5;
	}
}

int numbersBiggerThanFive = firstMatch( someIntegerList, greaterThanFive, defaultValue );
{% endhighlight %}

Other few examples can be found in (progfun)[https://github.com/SaumilP/java-progfun]. 

In Java 8, streams can be used to make use of newly added feature - lambda expressions.
{% highlight java %}
final Integer noBiggerThanFive = someList.stream().filter(no -> no > 5 ).get();
{% endhighlight %}

It is less verbose compared to older version of the code, but it gives neat and short presentation of the code.
Developers can focus more on the work getting done instead of worrying about getting syntax correct.

I will add more Java 8 examples in next post.
