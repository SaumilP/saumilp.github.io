---
layout: page
title: 'XML Schema Design Patterns'
categories: XML
tags: design-patterns architecture
comments: true
analysis: true
---

This might be one of the old topic - specially when lot of developers are working with RESTful Services, but i would like to point out couple of pros and cons. 

As most of the developers know, XML schema is very powerful, but they lack object-orientation, and are intended to capture a data model rather than an object model. In last one and half decades, there has been few tools available to architects and developers to be able to make use off some of the object orientation principles - like polymorphism for flexibility. But ultimately the whole point of the services must be general enough that it can communicate across languages. Hence i have attempted to put together some information around some of the very well known Design patterns.

Some of the XML Schema design patterns include Russian Doll, Venetian Blind & Salami Slice.

### Russian Doll ###
--------
Let us have a look at Russian Doll Design pattern. As name indicates - this design pattern permits single global root element which contains constituent types. All element declarations are nested inside the root element, and can therefore only be used once in within the context.

Some of the characteristics of this pattern are:

*	It has a single global root Element
*	All the types are local
*	It supports only schemas designed in a single file
*	Exposed schema is fully encapsulated
*	It has high cohesion with minimal coupling
*	Easy to read and write

One of the ceavet while considering this patter, do not use this pattern when you would want to reuse types.
Enough with the theory, let's have a look at the example.

![Visual Representation](http://{{ site.url }}/assets/images/russian_doll.png)

Equivalent Xml Schema Document can be found below:
{% highlight xml %}
<?xml version="1.0"?>
<xs:schema targetNamespace="http://www.w3.org/XML/1998/namespace" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:xs="http://www.w3.org/2001/XMLSchema">
	<xs:annotation>
		<xs:documentation>Schema using Russian Doll Pattern</xs:documentation>
	</xs:annotation>
	<xs:element name="Production">
		<xs:complexType>
			<xs:sequence>
				<xs:element name="Name" type="xs:string" />
				<xs:element name="Type">
					<xs:simpleType>
						<xs:restriction base="xs:string">
							<xs:enumeration value="TheatrePlay" />
							<xs:enumeration value="Movie" />
							<xs:enumeration value="MusicAlbum" />
						</xs:restriction>
					</xs:simpleType>
				</xs:element>
				<xs:element name="Producers" minOccurs="1" maxOccurs="unbounded" >
					<xs:complexType>
						<xs:sequence>
							<xs:element name="Name" type="xs:string" />
							<xs:element name="ExecutiveProducer" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
						</xs:sequence>
					</xs:complexType>
				</xs:element>
				<xs:element name="Writers" minOccurs="1" maxOccurs="unbounded" >
					<xs:complexType>
						<xs:sequence>
							<xs:element name="Name" type="xs:string" />
							<xs:element name="Scene" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
						</xs:sequence>
					</xs:complexType>
				</xs:element>
				<xs:element name="Nominations" minOccurs="1" maxOccurs="unbounded">
					<xs:complexType>
						<xs:sequence>
							<xs:element name="Category" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
							<xs:element name="Year" type="xs:int" />
							<xs:element name="Actor" minOccurs="1" maxOccurs="unbounded">
								<xs:complexType>
									<xs:sequence>
										<xs:element name="Name" type="xs:string" />
										<xs:element name="Role" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
									</xs:sequence>
								</xs:complexType>
							</xs:element>
						</xs:sequence>
					</xs:complexType>
				</xs:element>
				<xs:element name="Cast" minOccurs="1" maxOccurs="unbounded">
					<xs:complexType>
						<xs:sequence>
							<xs:element name="ActorName" type="xs:string" />
							<xs:element name="CastingRole" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
							<xs:element name="CastingName" type="xs:string" />
						</xs:sequence>
					</xs:complexType>
				</xs:element>
			</xs:sequence>
		</xs:complexType>
	</xs:element>
</xs:schema>
{% endhighlight %}

As you can see, above schema defines a single global element <string>Production</string> and it is easy to read and write because there is no mixing. The types required to create a production element are all the nested within it. Elements and types cannot be referenced, and Namespaces are localized. And because it is self-contained, changing types will not affect other schemas.

One of the biggest disadvantages of this pattern with respect to straight XML is that the types you carefully defined cannot be reused elsewhere, hence causing very large schema. 

This design pattern is perhaps an appropriate design to use when wrapping legacy data from a source that is fairly static.

### Salami Slice ###
--------
