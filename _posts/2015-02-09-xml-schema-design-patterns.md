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

![Russian Doll XSD](http://{{ site.url }}/assets/images/russian_doll.png)

Equivalent Xml Schema Document can be found below:
{% highlight xml %}
<?xml version="1.0"?>
<?xml-stylesheet href="../2008/09/xsd.xsl" type="text/xsl"?>
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
This pattern represents opposite end of the design spectrum from Russian Doll.

By using this pattern, use can declare all the elements as global, but declare all types locally. Pattern is named as Salami Slice because of the ability to set all the elements in global namespace and to make them reusable - which acts as a single definition <strong>slice</strong>. These slices can be used to combined with others for better reusablility.

With this pattern, schema can have more components, all defined individually - which are then brought together into global elements. This pattern is entirely open, allowing a wide variety of possible combinations compared to its counter part pattern Russian Doll - which is absolutely rigid and inflexible. Physical structure of the Russian Doll allows only one way to put the constituents toghether, while slices offer no guidance for how they might be arranged in schema.

Some of the characteristics of this pattern are:

*	All elements are global
*	All elements are defined within global namespace
*	All types are local
*	Element declarations are never nested
*	Element declarations are reusable.
*	It is difficult to determine intended root element, as there can be many potential choices.

Example from Russian Doll has been redesigned and represented differently with salami slice:
![Salami Slice XSD](http://{{ site.url }}/assets/images/salami_slice_2015_02_09.png)

Equivalent Xml Schema Document can be found below:
{% highlight xml %}
<?xml version="1.0"?>
<?xml-stylesheet href="../2008/09/xsd.xsl" type="text/xsl"?>
<xs:schema targetNamespace="http://www.w3.org/XML/1998/namespace" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://design.pattern.org/salami" elementFormDefault="qualified">
	<xs:annotation>
		<xs:documentation>Schema using Salami Slice Design Pattern</xs:documentation>
	</xs:annotation>
	<xs:complexType name="ProducerType">
		<xs:sequence>
			<xs:element name="Name" type="xs:string" />
			<xs:element name="ExecutiveProducer" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
		</xs:sequence>
	</xs:complexType>
	<xs:complexType name="CastType">
		<xs:sequence>
			<xs:element name="ActorName" type="xs:string" />
			<xs:element name="CastingRole" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
			<xs:element name="CastingName" type="xs:string" />
		</xs:sequence>
	</xs:complexType>
	<xs:complexType name="NominationType">
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
	<xs:complexType name="WriterType">
		<xs:sequence>
			<xs:element name="Name" type="xs:string" />
			<xs:element name="Scene" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
		</xs:sequence>
	</xs:complexType>
	<xs:element name="Name" type="xs:string" />
	<xs:element name="Producers" type="xml:ProducerType" />
	<xs:element name="Writers" type="xml:WriterType" />
	<xs:element name="Nominations" type="xml:NominationType" />
	<xs:element name="Performer" type="xml:CastType" />
	<xs:element name="Director" type="xs:string" />
	<xs:element name="Production">
		<xs:complexType>
			<xs:sequence>
				<xs:element ref="xml:Name" />
				<xs:element name="Type">
					<xs:simpleType>
						<xs:restriction base="xs:string">
							<xs:enumeration value="TheatrePlay" />
							<xs:enumeration value="Movie" />
							<xs:enumeration value="MusicAlbum" />
						</xs:restriction>
					</xs:simpleType>
				</xs:element>
				<xs:element ref="xml:Producers" />
				<xs:element ref="xml:Writers" />
				<xs:element ref="xml:Nominations" />
				<xs:element ref="xml:Director" />
				<xs:element ref="xml:Performer" />
			</xs:sequence>
		</xs:complexType>
	</xs:element>
</xs:schema>
{% endhighlight %}

The main advantage of this pattern is that becuase the elements are declared globally, schema is reusable. But because changing an element affects the composing elements, this pattern is considered tightly coupled.

This schema design pattern are verbose and are clearly arranged and flat.

### Venetian Blind ###
--------
This pattern is an extension of Russian Doll Pattern. It contains only one signle global root element. It departs from Russian Doll in that it allows for reuse of all the types as well asd the global root element.

Use of this pattern means that schema designer wants to define a single global root element for instanciantion and compose it with externally defined types. This has the benefit of miximiizing reuse.

Some of the characteristics of this pattern are:

*	It has a single global root element
*	It mixes global and local declarations
*	It has high cohesion but also high coupling
*	It maximizes reuse of all the types.
*	Encapsulation is limited due to types being exposed.
*	It allows designers to use multiple files to define schema
*	It is verbose. Breaking apart each type in a way provides very selective, granular control over each individual aspect on the element, but makes for a lot of typing.

Original Example from Russian Doll has been redesigned and represented differently with salami slice:
![Venetian Blind XSD](http://{{ site.url }}/assets/images/venetian_blind_2015_02_09.png)

Equivalent Xml Schema Document can be found below:
{% highlight xml %}
<?xml version="1.0"?>
<?xml-stylesheet href="../2008/09/xsd.xsl" type="text/xsl"?>
<xs:schema targetNamespace="http://www.w3.org/XML/1998/namespace" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://design.pattern.org/salami" elementFormDefault="qualified">
	<xs:annotation>
		<xs:documentation>Schema using Salami Slice Design Pattern</xs:documentation>
	</xs:annotation>
	<xs:complexType name="CommonName">
		<xs:sequence>
			<xs:element name="Name" type="xs:string" />
		</xs:sequence>
	</xs:complexType>
	<xs:group name="ContributionGroup">
		<xs:sequence>
			<xs:element name="Name" type="xml:CommonName" />
			<xs:element name="Contribution" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
		</xs:sequence>
	</xs:group>
	<xs:complexType name="ProducerType">
		<xs:sequence>
			<xs:group ref="xml:ContributionGroup" minOccurs="1" maxOccurs="unbounded"/>
		</xs:sequence>
	</xs:complexType>
	<xs:complexType name="CastType">
		<xs:sequence>
			<xs:element name="ActorName" type="xml:CommonName" />
			<xs:element name="CastingRole" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
			<xs:element name="CastingName" type="xs:string" />
		</xs:sequence>
	</xs:complexType>
	<xs:complexType name="NominationType">
		<xs:sequence>
			<xs:element name="Category" type="xs:string" minOccurs="1" maxOccurs="unbounded" />
			<xs:element name="Year" type="xs:int" />
			<xs:group ref="xml:ContributionGroup" minOccurs="1" maxOccurs="unbounded"/>			
		</xs:sequence>
	</xs:complexType>
	<xs:complexType name="WriterType">
		<xs:sequence>
			<xs:group ref="xml:ContributionGroup" minOccurs="1" maxOccurs="unbounded"/>
		</xs:sequence>
	</xs:complexType>
	<xs:element name="Name" type="xs:string" />
	<xs:element name="Producers" type="xml:ProducerType" />
	<xs:element name="Writers" type="xml:WriterType" />
	<xs:element name="Nominations" type="xml:NominationType" />
	<xs:element name="Performer" type="xml:CastType" />
	<xs:element name="Director" type="xs:string" />
	<xs:element name="Production">
		<xs:complexType>
			<xs:sequence>
				<xs:element ref="xml:Name" />
				<xs:element name="Type" >
					<xs:simpleType>
						<xs:restriction base="xs:string">
							<xs:enumeration value="TheatrePlay" />
							<xs:enumeration value="Movie" />
							<xs:enumeration value="MusicAlbum" />
						</xs:restriction>
					</xs:simpleType>
				</xs:element>
				<xs:element ref="xml:Producers" />
				<xs:element ref="xml:Writers" />
				<xs:element ref="xml:Nominations" />
				<xs:element ref="xml:Director" />
				<xs:element ref="xml:Performer" />
			</xs:sequence>
		</xs:complexType>
	</xs:element>
</xs:schema>
{% endhighlight %}

Because this pattern has more flexibiliy, it is de-facto design pattern during XML Design pattern. There are several other patterns - like Garden of Eden and Chameleon - make uses of these basic patterns to solve other issues. I will try and attend rest of the patterns in next part.