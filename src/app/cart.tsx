import { Header } from '@/components/header';
import { Alert, Linking, ScrollView, Text, View } from 'react-native';

import { ProductsCartProps, useCartStore } from '@/stores/cart-store';
import { Product } from '@/components/product';
import { formatCurreny } from '@/utils/functions/format-currency';
import { Input } from '@/components/input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components/button';
import { Feather } from '@expo/vector-icons';
import { LinkButton } from '@/components/link-button';
import { useState } from 'react';
import { useNavigation } from 'expo-router';

const { PHONE_NUMBER } = process.env;

export default function Cart() {

    const [address, setAddress] = useState("");
    const cartStore = useCartStore();
    const navigation = useNavigation();

    const total = formatCurreny( cartStore.products.reduce( (total, product) => total+(product.price*product.quantity), 0 ) );

    function handleProductRemove(product: ProductsCartProps) {

        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`,[
            {
                text: 'Cancelar'
            },
            {
                text: 'Remover',
                onPress: () => {
                    cartStore.remove(product.id);
                }
            }
        ]);

    }

    function handleOrder() {
        
        if (address.trim().length == 0) {
            return Alert.alert("Pedido", "Informe os dados da entrega.");
        }

        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join('');

        // https://getemoji.com/
        const msg = `
            🍔NOVO PEDIDO
            \n Entregar em:
            \n ${address}

            ${products}
            \n Valor total: ${total}
        `.trim();

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${msg}`);

        cartStore.clear();
        navigation.goBack();
    }

    return (
        <View className='flex-1 pt-8'>
            <Header title="Seu Carrinho" />

            {/* ajuste ao abrir teclado no IOS */}
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className='p-5 flex-1'>
                        {
                            cartStore.products.length ? 
                            (
                                <View className='border-b border-slate-700'>
                                    {
                                        cartStore.products.map((product) => (
                                            <Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />
                                        ))
                                    }
                                </View>
                            ) : 
                            (
                                <Text className='font-body text-slate-400 text-center my-8'>
                                    Seu carrinho esta vazio
                                </Text>
                            )
                        }

                        <View className='flex-row gap-2 items-center mt-5 mb-4'>
                            <Text className='text-white text-xl font-subtitle'>
                                Total:
                            </Text>
                            <Text className='text-lime-400 text-2xl font-heading'>
                                {total}
                            </Text>
                        </View>

                        <Input
                            placeholder='Informe o endereço de entrega com rua, bairro, CEP, numero e complemento ...'
                            onChangeText={setAddress}
                            value={address}
                            blurOnSubmit={true}// efeito de enter(submit)
                            onSubmitEditing={handleOrder}// efeito de enter(submit)
                        />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
            
            <View className='p-5 gap-5'>
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar Pedido</Button.Text>
                    <Button.Icon>
                        <Feather name='arrow-right-circle' size={20} />
                    </Button.Icon>
                </Button>
                <LinkButton href='/' title='Voltar ao cardápio' />
            </View>

        </View>
    )
}