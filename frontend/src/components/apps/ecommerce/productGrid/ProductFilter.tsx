// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useDispatch, useSelector } from 'src/store/Store';
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  FormGroup,
  ListItemIcon,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  // Avatar,
  Button,
  // Stack
  Rating,
} from '@mui/material';
import {
  filterProducts,
  sortByProducts,
  sortByGender,
  // sortByColor,
  sortByPrice,
  filterReset,
} from 'src/store/apps/eCommerce/ECommerceSlice';
import {

  IconCircles,
  IconNotebook,
  IconDeviceLaptop,
  IconSortAscending2,
  IconSortDescending2,
  IconAd2,
  // IconCheck,
  IconSettings
} from '@tabler/icons-react';
import { ProductFiterType } from 'src/types/apps/eCommerce';
import { IconAdjustmentsCode } from '@tabler/icons-react';
import { sortByRating } from 'src/store/apps/eCommerce/ECommerceSlice';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ecommerceReducer.products);
  const active = useSelector((state) => state.ecommerceReducer.filters);
  const checkactive = useSelector((state) => state.ecommerceReducer.sortBy);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const getUniqueData = (data: string[], attr: any) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });
    if (attr === 'colors') {
      newVal = newVal.flat();
    }

    return (newVal = ['All', ...Array.from(new Set(newVal))]);
  };

  // const filterbyGender = getUniqueData(products, 'gender');
  // // const filterbyColors = getUniqueData(products, 'colors');

  const filterCategory: ProductFiterType[] = [
    {
      id: 1,
      filterbyTitle: 'Chủ đề',
    },
    {
      id: 2,
      name: 'Tất cả',
      sort: 'All',
      icon: IconCircles,
    },
    {
      id: 3,
      name: 'python',
      sort: 'python',
      icon: IconAdjustmentsCode,
    },
    {
      id: 9,
      name: 'Java',
      sort: 'Java',
      icon: IconNotebook,
    },
    {
      id: 10,
      name: 'SQL',
      sort: 'sql',
      icon: IconSettings,
    },
    {
      id: 11,
      name: 'HTML, CSS',
      sort: 'html',
      icon: IconDeviceLaptop,
    },
    {
      id: 6,
      devider: true,
    },
  ];
  const filterbyPrice = [
    {
      id: 0,
      label: 'Tất cả',
      value: 'All',
    },
    {
      id: 1,
      label: `${Number(50000).toLocaleString('vi-VN')} đ - ${Number(500000).toLocaleString('vi-VN')} đ`,
      value: '50000-500000',
    },
    {
      id: 2,
      label: `${Number(500000).toLocaleString('vi-VN')} đ - ${Number(1000000).toLocaleString('vi-VN')} đ`,
      value: '500000-1000000',
    },
    {
      id: 3,
      label: `Trên ${Number(1000000).toLocaleString('vi-VN')} đ`,
      value: '1000000-999999',
    },
  ];
  // const filterbyRating = [
  //   { value: 1, label: '1 sao' },
  //   { value: 2, label: '2 sao' },
  //   { value: 3, label: '3 sao' },
  //   { value: 4, label: '4 sao' },
  //   { value: 5, label: '5 sao' },
  // ];

  const handlerPriceFilter = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.checked) {
      dispatch(sortByPrice({ price: value.target.value }));
    }
  };
  // const handlerRatingFilter = (value: number) => {
  //   dispatch(sortByRating({ rating: value }));
  // };



  return (
    <>
      <List>
        {/* ------------------------------------------- */}
        {/* Category filter */}
        {/* ------------------------------------------- */}
        {filterCategory.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <Typography variant="subtitle2" fontWeight={600} px={3} mt={2} pb={2} key={filter.id}>
                {filter.filterbyTitle}
              </Typography>
            );
          } else if (filter.devider) {
            return <Divider key={filter.id} />;
          }

          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3, borderRadius: br }}
              selected={active.category === `${filter.sort}`}
              onClick={() => dispatch(filterProducts({ category: `${filter.sort}` }))}
              key={filter.id}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <filter.icon stroke="1.5" size="19" />
              </ListItemIcon>
              <ListItemText>{filter.name}</ListItemText>
            </ListItemButton>
          );
        })}
        {/* ------------------------------------------- */}
        {/* Rating filter */}
        {/* ------------------------------------------- */}
       
        {/* Rating filter */}
        {/* <Typography variant="h6" px={3} mt={3} pb={2}>
          Đánh giá sao
        </Typography>
        <Box p={3} pt={0}>
          <FormGroup>
            {filterbyRating.map((rating) => (
              <FormControlLabel
                key={rating.l}
                control={
                  <Radio
                    value={rating.value.toString()} // Chuyển rating.value thành string
                    checked={active.rating === rating.value.toString()} // So sánh với active.rating dưới dạng string
                    onChange={() => handlerRatingFilter(rating.value)}
                  />
                }
                label={rating.label}
              />
            ))}
          </FormGroup>
        </Box>
        <Divider /> */}

        {/* ------------------------------------------- */}
        {/* Filter By Pricing */}
        {/* ------------------------------------------- */}
        <Typography variant="h6" px={3} mt={3} pb={2}>
          Giá khóa học
        </Typography>
        <Box p={3} pt={0}>
          <FormGroup>
            {filterbyPrice.map((price) => (
              <FormControlLabel
                key={price.label}
                control={
                  <Radio
                    value={price.value}
                    checked={active.price === price.value}
                    onChange={handlerPriceFilter}
                  />
                }
                label={price.label}
              />
            ))}
          </FormGroup>
        </Box>
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Reset */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Button variant="contained" onClick={() => dispatch(filterReset())} fullWidth>
            Xóa lọc
          </Button>
        </Box>
      </List>
    </>
  );
};

export default ProductFilter;
